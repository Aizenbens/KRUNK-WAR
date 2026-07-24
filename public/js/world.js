import * as THREE from "three";
export default class World {

    constructor(scene) {

        this.scene = scene;

        this.createLights();

        this.createGround();

        this.createObstacles();

    }

    createLights() {

        const ambient = new THREE.AmbientLight(0xffffff, 1.2);
        this.scene.add(ambient);

        const sun = new THREE.DirectionalLight(0xffffff, 2);

        sun.position.set(25, 40, 15);

        sun.castShadow = true;

        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;

        this.scene.add(sun);

    }

    createGround() {

        const geometry = new THREE.PlaneGeometry(500, 500);

        const material = new THREE.MeshStandardMaterial({

            color: 0x3d8b37

        });

        const ground = new THREE.Mesh(
            geometry,
            material
        );

        ground.rotation.x = -Math.PI / 2;

        ground.receiveShadow = true;

        ground.name = "ground";

        this.scene.add(ground);

    }

    createObstacles() {

        const geometry = new THREE.BoxGeometry(4,4,4);

        const material = new THREE.MeshStandardMaterial({

            color: 0x777777

        });

        for(let i=0;i<40;i++){

            const box = new THREE.Mesh(
                geometry,
                material
            );

            box.position.set(

                (Math.random()-0.5)*200,

                2,

                (Math.random()-0.5)*200

            );

            box.castShadow = true;

            box.receiveShadow = true;

            box.name = "wall";

            this.scene.add(box);

        }

    }

}
