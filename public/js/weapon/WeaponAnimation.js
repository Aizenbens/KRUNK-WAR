
import * as THREE from "three";

export default class WeaponAnimation {

    constructor(weapon) {

        this.weapon = weapon;

        this.time = 0;

        this.walkSpeed = 8;

        this.walkAmount = 0.02;

        this.swayAmount = 0.0015;

        this.mouseX = 0;

        this.mouseY = 0;

        window.addEventListener("mousemove",(e)=>{

            this.mouseX = e.movementX;

            this.mouseY = e.movementY;

        });

    }

    update(delta, moving){

        if(moving){

            this.time += delta * this.walkSpeed;

        }else{

            this.time = 0;

        }

        const bobY =
            Math.sin(this.time * 2) *
            this.walkAmount;

        const bobX =
            Math.cos(this.time) *
            this.walkAmount * 0.5;

        this.weapon.position.y += bobY;

        this.weapon.position.x += bobX;

        this.weapon.rotation.y =
            THREE.MathUtils.lerp(

                this.weapon.rotation.y,

                this.mouseX *
                this.swayAmount,

                delta * 8

            );

        this.weapon.rotation.x +=

            this.mouseY *

            this.swayAmount *

            delta;

    }

}
