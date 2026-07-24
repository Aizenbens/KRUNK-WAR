
import * as THREE from "three";

export default class WeaponRecoil {

    constructor(weapon, config) {

        this.weapon = weapon;
        this.config = config;

        this.current = 0;

        this.side = 0;

    }

    shoot() {

        this.current += this.config.recoil.up;

        this.side +=
            (Math.random() - 0.5) *
            this.config.recoil.side;

    }

    update(delta) {

        this.current = THREE.MathUtils.lerp(

            this.current,

            0,

            delta * this.config.recoil.recovery

        );

        this.side = THREE.MathUtils.lerp(

            this.side,

            0,

            delta * this.config.recoil.recovery

        );

        this.weapon.rotation.x = -this.current;

        this.weapon.rotation.z = this.side;

    }

}
