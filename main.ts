onDisplay(() => {
    basic.showNumber(GROUP)
})

//% color="#00CC00" icon="\uf1f9"
//% block="Electric Wire"
namespace ELWire {

    export let REMOTE = false

    export enum Operation {
        //% block="ELWire 1 on"
        //% block.loc.nl="el-wire 1 aan"
        Wire1on,
        //% block="ELWire 1 off"
        //% block.loc.nl="el-wire 1 uit"
        Wire1off,
        //% block="ELWire 2 on"
        //% block.loc.nl="el-wire 2 aan"
        Wire2on,
        //% block="ELWire 2 off"
        //% block.loc.nl="el-wire 2 uit"
        Wire2off,
    }
    export enum Wire {
        //% block="el-wire 1"
        //% block.loc.nl="el-wire 1"
        Wire1,
        //% block="el-wire 2"
        //% block.loc.nl="el-wire 2"
        Wire2
    }

    //% block="turn remote control on"
    //% block.loc.nl="zet afstandbediening aan"
    export function setRemote() {
        REMOTE = true
    }

    //% block="turn %elwire off"
    //% block.loc.nl="doe %elwire uit"
    export function wireOff(elwire: Wire) {
        if (REMOTE)
            radio.sendNumber(elwire == Wire.Wire1 ? Operation.Wire1off : Operation.Wire2off)
        else {
            let pin = (elwire == Wire.Wire1 ? DigitalPin.P1 : DigitalPin.P2);
            pins.digitalWritePin(pin, 0);
        }
    }

    //% block="turn %elwire on"
    //% block.loc.nl="doe %elwire aan"
    export function wireOn(elwire: Wire) {
        if (REMOTE)
            radio.sendNumber(elwire == Wire.Wire1 ? Operation.Wire1on : Operation.Wire2on)
        else {
            let pin = (elwire == Wire.Wire1 ? DigitalPin.P1 : DigitalPin.P2);
            pins.digitalWritePin(pin, 1);
        }
    }

    //% block="turn %elwire on for %time sec"
    //% block.loc.nl="doe %elwire %time sec aan"
    export function wireOnOff(elwire: Wire, time: number) {
        if (REMOTE) {
            radio.sendNumber(elwire == Wire.Wire1 ? Operation.Wire1on : Operation.Wire2on)
            basic.pause(time * 1000);
            radio.sendNumber(elwire == Wire.Wire1 ? Operation.Wire1off : Operation.Wire2off)
        }
        else {
            let pin1 = (elwire == Wire.Wire1 ? DigitalPin.P1 : DigitalPin.P2);
            pins.digitalWritePin(pin1, 1);
            basic.pause(time * 1000);
            pins.digitalWritePin(pin1, 0);
        }
    }

    radio.onReceivedNumber(function (receivedNumber: number) {
        if (REMOTE) return // do not echo
        switch (receivedNumber) {
            case Operation.Wire1on:  wireOn(Wire.Wire1); break;
            case Operation.Wire1off: wireOff(Wire.Wire1); break;
            case Operation.Wire2on:  wireOn(Wire.Wire2); break;
            case Operation.Wire2off: wireOff(Wire.Wire2); break;
        }
    })}
