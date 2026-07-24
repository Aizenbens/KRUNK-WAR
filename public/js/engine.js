import * as THREE from "three";

import Player from "./player.js";
import Weapon from "./weapon.js";
import World from "./world.js";
export default class Engine {

    constructor() {
        console.log("3 - Engine constructor");
        this.scene = new THREE.Scene();
        console.log("4 - Scene created");
        this.scene.background = new THREE.Color(0x87ceeb);
        this.scene.fog = new THREE.Fog(0x87ceeb, 80, 300);

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.shadowMap.enabled = true;

        document.body.appendChild(
            this.renderer.domElement
        );

        this.clock = new THREE.Clock();

        this.world = new World(this.scene);

        this.player = new Player(this.camera);
        console.log("5 - Player created");
        this.weapon = new Weapon(
            console.log("6 - Weapon created");
            this.scene,
            this.camera
        );

        this.scene.add(this.camera);

        window.addEventListener(
            "resize",
            () => this.onResize()
        );

        window.addEventListener(
            "mousedown",
            (e) => {

                if (e.button === 0)
                    this.weapon.shoot();

            }
        );

    }

    start() {

        this.animate();

    }

    animate() {

        requestAnimationFrame(
            () => this.animate()
        );

        const delta =
            this.clock.getDelta();

        this.player.update(delta);

        this.renderer.render(
            this.scene,
            this.camera
        );

    }

    onResize() {

        this.camera.aspect =
            window.innerWidth /
            window.innerHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }

}
