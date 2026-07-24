import * as THREE from "https://unpkg.com/three@0.167.1/build/three.module.js";

export default class World {

    constructor(scene) {

        this.scene = scene;

        this.createLights();
        this.createGround();
        this.createWalls();
        this.createBoxes();

    }

    createLights() {

        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambient);

        const sun = new THREE.DirectionalLight(0xffffff, 1.2);
        sun.position.set(20, 40, 20);
        sun.castShadow = true;

        this.scene.add(sun);

    }

    createGround() {

        const geometry = new THREE.PlaneGeometry(300, 300);

        const material = new THREE.MeshStandardMaterial({
            color: 0x3d8b37
        });

        const ground = new THREE.Mesh(geometry, material);

        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.name = "Ground";

        this.scene.add(ground);

    }

    createWalls() {

        const geometry = new THREE.BoxGeometry(8,6,1);

        const material = new THREE.MeshStandardMaterial({
            color: 0x888888
        });

        const positions = [

            [0,3,-25],
            [25,3,0],
            [-25,3,0],
            [0,3,25],

            [12,3,-10],
            [-12,3,10],
            [15,3,18],
            [-18,3,-15]

        ];

        positions.forEach(pos=>{

            const wall = new THREE.Mesh(
                geometry,
                material
            );

            wall.position.set(
                pos[0],
                pos[1],
                pos[2]
            );

            wall.castShadow = true;
            wall.receiveShadow = true;

            wall.name = "Wall";

            this.scene.add(wall);

        });

    }

    createBoxes() {

        const geometry = new THREE.BoxGeometry(3,3,3);

        const material = new THREE.MeshStandardMaterial({
            color: 0x8b5a2b
        });

        for(let i=0;i<30;i++){

            const box = new THREE.Mesh(
                geometry,
                material
            );

            box.position.set(

                Math.random()*120-60,

                1.5,

                Math.random()*120-60

            );

            box.castShadow = true;
            box.receiveShadow = true;

            box.name = "Box";

            this.scene.add(box);

        }

    }

}
