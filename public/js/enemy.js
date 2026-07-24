import * as THREE from "https://unpkg.com/three@0.164.1/build/three.module.js";
export default class Enemy {

    constructor(scene, position = new THREE.Vector3()) {

        this.scene = scene;

        this.health = 100;

        this.speed = 2;

        this.alive = true;

        this.mesh = this.createMesh();

this.mesh.userData.enemy = this;

this.mesh.position.copy(position);

this.mesh.name = "enemy";

this.scene.add(this.mesh);
    }

    createMesh() {

        const body = new THREE.Mesh(

            new THREE.BoxGeometry(1.5,2.5,1.5),

            new THREE.MeshStandardMaterial({

                color:0xff3333

            })

        );

        body.castShadow = true;

        body.receiveShadow = true;

        return body;

    }

    update(playerPosition, delta){

        if(!this.alive) return;

        const dir = new THREE.Vector3()

            .subVectors(playerPosition,this.mesh.position)

            .normalize();

        this.mesh.position.addScaledVector(

            dir,

            this.speed * delta

        );

    }

    damage(amount){

        if(!this.alive) return;

        this.health -= amount;

        if(this.health <= 0){

            this.die();

        }

    }

    die(){

        this.alive = false;

        this.scene.remove(this.mesh);

    }

}
