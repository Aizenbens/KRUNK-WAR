
import * as THREE from "three";

export default class WeaponEffects {

    constructor(weapon) {

        this.weapon = weapon;

        this.flash = this.createFlash();

    }

    createFlash() {

        const geometry = new THREE.SphereGeometry(
            0.06,
            8,
            8
        );

        const material = new THREE.MeshBasicMaterial({

            color: 0xffcc55,

            transparent: true,

            opacity: 0

        });

        const flash = new THREE.Mesh(
            geometry,
            material
        );

        flash.position.set(
            0,
            0,
            -0.55
        );

        this.weapon.add(flash);

        return flash;

    }

    shoot() {

        this.flash.material.opacity = 1;

        this.flash.scale.set(
            1.5,
            1.5,
            1.5
        );

    }

    update(delta) {

        this.flash.material.opacity = THREE.MathUtils.lerp(

            this.flash.material.opacity,

            0,

            delta * 30

        );

        this.flash.scale.lerp(

            new THREE.Vector3(1,1,1),

            delta * 20

        );

    }

}
