
import * as THREE from "three";

import { Weapons } from "./WeaponConfig.js";

export default class Weapon {

    constructor(scene, camera) {

        this.scene = scene;
        this.camera = camera;

        // السلاح المختار من القائمة
        const selected =
            localStorage.getItem("weapon") || "rifle";

        this.config =
            Weapons[selected];

        this.ammo =
            this.config.magazine;

        this.reloading = false;

        this.lastShot = 0;

        this.mesh = null;

        this.createWeapon();
        this.ads = new WeaponADS(
    this.camera,
    this.mesh,
    this.config
);

this.recoil = new WeaponRecoil(
    this.mesh,
    this.config
);

this.animation = new WeaponAnimation(
    this.mesh
);

this.effects = new WeaponEffects(
    this.mesh
);

    }

    createWeapon() {
        

        const body =
            new THREE.BoxGeometry(
                0.25,
                0.18,
                0.90
            );

        const material =
            new THREE.MeshStandardMaterial({

                color:0x2d2d2d,

                metalness:0.6,

                roughness:0.35

            });

        this.mesh =
            new THREE.Mesh(
                body,
                material
            );

        this.mesh.position.set(

            0.38,
            -0.32,
            -0.70

        );

        this.mesh.castShadow = true;

        this.camera.add(
            this.mesh
        );

    }

    shoot(){

        const now =
            performance.now();

        if(
            now - this.lastShot <
            this.config.fireRate
        )
            return;

        if(
            this.reloading
        )
            return;

        if(
            this.ammo <= 0
        ){

            this.reload();

            return;

        }

        this.lastShot = now;

        this.ammo--;
        this.recoil.shoot();

this.effects.shoot();

    }

    reload(){

        if(this.reloading)
            return;

        this.reloading = true;

        setTimeout(()=>{

            this.ammo =
                this.config.magazine;

            this.reloading = false;

        },this.config.reloadTime);

    }

    update(delta){

    this.ads.update(delta);

    this.recoil.update(delta);

    this.animation.update(delta, false);

    this.effects.update(delta);

}

}
