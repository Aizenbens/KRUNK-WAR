import * as THREE from "https://unpkg.com/three@0.167.1/build/three.module.js";

import World from "./world.js";
import Player from "./player.js";
import Weapon from "./weapon.js";

export default class Engine {

    constructor() {

        /* Scene */

        this.scene = new THREE.Scene();

        this.scene.background = new THREE.Color(0x87ceeb);

        /* Camera */

        this.camera = new THREE.PerspectiveCamera(

            75,

            window.innerWidth / window.innerHeight,

            0.1,

            1000

        );

        /* Renderer */

        this.renderer = new THREE.WebGLRenderer({

            canvas: document.getElementById("gameCanvas"),

            antialias: true

        });

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

        this.renderer.shadowMap.enabled = true;

        /* Clock */

        this.clock = new THREE.Clock();

        /* World */

        this.world = new World(this.scene);

        /* Player */

        this.player = new Player(this.camera);

        /* Weapon */

        this.weapon = new Weapon(

            this.scene,

            this.camera

        );

        this.scene.add(this.camera);

        window.addEventListener(

            "resize",

            () => this.resize()

        );

    }

    resize() {

        this.camera.aspect =

            window.innerWidth /

            window.innerHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }

    update(delta) {

        this.player.update(delta);

        this.weapon.update(delta);

    }

    render() {

        this.renderer.render(

            this.scene,

            this.camera

        );

    }

    animate() {

        requestAnimationFrame(

            () => this.animate()

        );

        const delta =

            this.clock.getDelta();

        this.update(delta);

        this.render();

    }

    start() {

        this.animate();

    }

}
