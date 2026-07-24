import * as THREE from "https://unpkg.com/three@0.167.1/build/three.module.js";

export default class Weapon {

    constructor(scene, camera) {

        this.scene = scene;
        this.camera = camera;

        this.damage = 25;

        this.fireRate = 120;

        this.lastShot = 0;

        this.maxAmmo = 30;

        this.ammo = this.maxAmmo;

        this.reloadTime = 2000;

        this.reloading = false;

        this.raycaster = new THREE.Raycaster();

        this.ads = false;

        this.normalFov = 75;
        this.adsFov = 45;

        this.normalPos = new THREE.Vector3(
            0.35,
            -0.28,
            -0.65
        );

        this.adsPos = new THREE.Vector3(
            0,
            -0.08,
            -0.35
        );

        this.createWeapon();

        this.createMuzzleFlash();

        this.updateHUD();

        window.addEventListener("mousedown",(e)=>{

            if(e.button===2)
                this.ads=true;

        });

        window.addEventListener("mouseup",(e)=>{

            if(e.button===2)
                this.ads=false;

        });

        window.addEventListener("contextmenu",(e)=>{

            e.preventDefault();

        });

    }

    createWeapon(){

        const geometry=
            new THREE.BoxGeometry(
                0.25,
                0.18,
                0.9
            );

        const material=
            new THREE.MeshStandardMaterial({

                color:0x222222,

                metalness:0.6,

                roughness:0.4

            });

        this.mesh=
            new THREE.Mesh(
                geometry,
                material
            );

        this.mesh.castShadow=true;

        this.mesh.position.copy(
            this.normalPos
        );

        this.camera.add(this.mesh);

    }

    createMuzzleFlash(){

        const geometry=
            new THREE.SphereGeometry(
                0.06,
                10,
                10
            );

        const material=
            new THREE.MeshBasicMaterial({

                color:0xffcc44

            });

        this.flash=
            new THREE.Mesh(
                geometry,
                material
            );

        this.flash.position.set(
            0,
            0,
            -0.55
        );

        this.flash.visible=false;

        this.mesh.add(this.flash);

    }

    shoot(){

        if(this.reloading)
            return;

        if(this.ammo<=0){

            this.reload();

            return;

        }

        const now=
            performance.now();

        if(now-this.lastShot<
            this.fireRate)
            return;

        this.lastShot=now;

        this.ammo--;

        this.updateHUD();

        this.flash.visible=true;

        setTimeout(()=>{

            this.flash.visible=false;

        },40);

        this.raycaster.setFromCamera(

            new THREE.Vector2(0,0),

            this.camera

        );

        const hit=
            this.raycaster.intersectObjects(

                this.scene.children,

                true

            );

        if(hit.length){

            const object=
                hit[0].object;

            if(
                object.parent &&
                object.parent.userData.enemy
            ){

                object.parent.userData.enemy.damage(
                    this.damage
                );

            }

            this.createTracer(
                hit[0].point
            );

        }

    }
        createTracer(hitPoint){

        const material =
            new THREE.LineBasicMaterial({

                color:0xffff66

            });

        const points = [

            new THREE.Vector3(
                0,
                0,
                0
            ),

            this.camera.worldToLocal(
                hitPoint.clone()
            )

        ];

        const geometry =
            new THREE.BufferGeometry()
                .setFromPoints(points);

        const tracer =
            new THREE.Line(
                geometry,
                material
            );

        this.camera.add(tracer);

        setTimeout(()=>{

            this.camera.remove(tracer);

        },40);

    }

    reload(){

        if(this.reloading)
            return;

        this.reloading=true;

        setTimeout(()=>{

            this.ammo=this.maxAmmo;

            this.reloading=false;

            this.updateHUD();

        },this.reloadTime);

    }

    updateHUD(){

        const ammo =
            document.getElementById("ammo");

        if(ammo){

            ammo.textContent =
                this.reloading
                ? "Reload..."
                : this.ammo;

        }

    }

    update(delta){

        const targetPos =
            this.ads
            ? this.adsPos
            : this.normalPos;

        this.mesh.position.lerp(
            targetPos,
            delta * 12
        );

        const targetFov =
            this.ads
            ? this.adsFov
            : this.normalFov;

        this.camera.fov +=
            (targetFov - this.camera.fov)
            * delta * 10;

        this.camera.updateProjectionMatrix();

        this.mesh.rotation.x =
            Math.sin(
                performance.now()*0.01
            ) *
            (this.ads ? 0.002 : 0.01);

    }

}
