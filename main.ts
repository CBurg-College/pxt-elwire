//% color="#00CC00" icon="\uf1f9"
//% block="Electric Wire"
namespace CBurgElWire {

    export enum ElWire {
        //% block="el-wire 1"
        //% block.loc.nl="el-wire 1"
        Wire1,
        //% block="el-wire 2"
        //% block.loc.nl="el-wire 2"
        Wire2
    }

    //% block="wait %time sec"
    //% block.loc.nl="wacht %time sec"
    export function wait(time: number) {
        basic.pause(time * 1000);
    }

    //% block="turn %elwire off"
    //% block.loc.nl="doe %elwire uit"
    export function showOff(elwire: ElWire) {
        let pin3 = (elwire == ElWire.Wire1 ? DigitalPin.P1 : DigitalPin.P2);
        pins.digitalWritePin(pin3, 0);
    }

    //% block="turn %elwire on"
    //% block.loc.nl="doe %elwire aan"
    export function showOn(elwire: ElWire) {
        let pin2 = (elwire == ElWire.Wire1 ? DigitalPin.P1 : DigitalPin.P2);
        pins.digitalWritePin(pin2, 1);
    }

    //% block="turn %elwire on for %time sec"
    //% block.loc.nl="doe %elwire %time sec aan"
    export function showTime(elwire: ElWire, time: number) {
        let pin1 = (elwire == ElWire.Wire1 ? DigitalPin.P1 : DigitalPin.P2);
        pins.digitalWritePin(pin1, 1);
        basic.pause(time * 1000);
        pins.digitalWritePin(pin1, 0);
    }
}
