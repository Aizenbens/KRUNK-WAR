import * as THREE from "https://unpkg.com/three@0.164.1/build/three.module.js";
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

        this.createWeapon();

        this.createMuzzleFlash();

        this.updateHUD();

    }

    createWeapon() {

        const geometry = new THREE.BoxGeometry(
            0.25,
            0.18,
            0.9
        );

        const material = new THREE.MeshStandardMaterial({
            color: 0x222222
        });

        this.mesh = new THREE.Mesh(
            geometry,
            material
        );

        this.mesh.position.set(
            0.35,
            -0.28,
            -0.65
        );

        this.mesh.castShadow = true;

        this.camera.add(this.mesh);

    }

    createMuzzleFlash() {

        const geometry = new THREE.SphereGeometry(
            0.06,
            8,
            8
        );

        const material = new THREE.MeshBasicMaterial({
            color: 0xffcc44
        });

        this.flash = new THREE.Mesh(
            geometry,
            material
        );

        this.flash.visible = false;

        this.flash.position.set(
            0,
            0,
            -0.55
        );

        this.mesh.add(this.flash);

    }

    shoot() {

        if (this.reloading)
            return;

        if (this.ammo <= 0) {

            this.reload();

            return;

        }

        const now = performance.now();

        if (now - this.lastShot < this.fireRate)
            return;

        this.lastShot = now;

        this.ammo--;

        this.updateHUD();

        this.flash.visible = true;

        setTimeout(() => {

            this.flash.visible = false;

        }, 40);

        this.raycaster.setFromCamera(
            new THREE.Vector2(0, 0),
            this.camera
        );

        const intersects =
            this.raycaster.intersectObjects(
                this.scene.children,
                true
            );

        if (intersects.length > 0) {

            const object = intersects[0].object;

            if (
                object.parent &&
                object.parent.userData.enemy
            ) {

                object.parent.userData.enemy.damage(
                    this.damage
                );

            }

        }

    }

    reload() {

        if (this.reloading)
            return;

        this.reloading = true;

        setTimeout(() => {

            this.ammo = this.maxAmmo;

            this.reloading = false;

            this.updateHUD();

        }, this.reloadTime);

    }

    updateHUD() {

        const ammo =
            document.getElementById("ammo");

        if (ammo) {

            ammo.textContent =
                this.ammo;

        }

    }

    update(delta) {

        this.mesh.rotation.x =
            Math.sin(
                performance.now() * 0.01
            ) * 0.01;

    }

}
