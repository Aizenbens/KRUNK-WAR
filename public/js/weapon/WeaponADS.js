
import * as THREE from "three";

export default class WeaponADS {

    constructor(camera, weapon, config) {

        this.camera = camera;
        this.weapon = weapon;
        this.config = config;

        this.enabled = false;

        this.normalFov = 75;
        this.adsFov = config.ads.fov;

        this.normalPosition = new THREE.Vector3(
            0.38,
            -0.32,
            -0.70
        );

        this.adsPosition = new THREE.Vector3(
            0.02,
            -0.12,
            -0.40
        );

        window.addEventListener("mousedown",(e)=>{

            if(e.button===2)
                this.enabled=true;

        });

        window.addEventListener("mouseup",(e)=>{

            if(e.button===2)
                this.enabled=false;

        });

        window.addEventListener("contextmenu",(e)=>{

            e.preventDefault();

        });

    }

    update(delta){

        const targetPos = this.enabled
            ? this.adsPosition
            : this.normalPosition;

        this.weapon.position.lerp(
            targetPos,
            delta * this.config.ads.speed
        );

        const targetFov = this.enabled
            ? this.adsFov
            : this.normalFov;

        this.camera.fov +=
            (targetFov - this.camera.fov)
            * delta * this.config.ads.speed;

        this.camera.updateProjectionMatrix();

    }

}
