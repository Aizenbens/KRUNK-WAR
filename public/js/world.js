import * as THREE from "https://unpkg.com/three@0.167.1/build/three.module.js";

export default class World {

    constructor(scene) {

        this.scene = scene;

        this.createGround();
        this.createLights();
        this.createMap();

    }

    createGround() {

        const geometry = new THREE.PlaneGeometry(500, 500);

        const material = new THREE.MeshStandardMaterial({
            color: 0x3b7d3b
        });

        const ground = new THREE.Mesh(geometry, material);

        ground.rotation.x = -Math.PI / 2;

        ground.receiveShadow = true;

        ground.name = "Ground";

        this.scene.add(ground);

    }

    createLights() {

        const ambient = new THREE.AmbientLight(0xffffff, 1);

        this.scene.add(ambient);

        const sun = new THREE.DirectionalLight(0xffffff, 2);

        sun.position.set(30, 50, 20);

        sun.castShadow = true;

        this.scene.add(sun);

    }

    createMap() {

        const material = new THREE.MeshStandardMaterial({
            color: 0x777777
        });

        for (let i = 0; i < 30; i++) {

            const box = new THREE.Mesh(

                new THREE.BoxGeometry(
                    5,
                    5 + Math.random() * 8,
                    5
                ),

                material

            );

            box.position.set(

                (Math.random() - 0.5) * 120,

                2.5,

                (Math.random() - 0.5) * 120

            );

            box.castShadow = true;

            box.receiveShadow = true;

            box.name = "Wall";

            this.scene.add(box);

        }

    }

}
