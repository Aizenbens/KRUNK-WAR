
export const Weapons = {

    rifle: {

        name: "Rifle",

        damage: 25,

        fireRate: 110,

        magazine: 30,

        reloadTime: 1800,

        range: 500,

        recoil: {

            up: 0.07,

            side: 0.02,

            recovery: 9

        },

        ads: {

            fov: 48,

            speed: 12

        }

    },

    smg: {

        name: "SMG",

        damage: 16,

        fireRate: 70,

        magazine: 40,

        reloadTime: 1600,

        range: 250,

        recoil: {

            up: 0.05,

            side: 0.03,

            recovery: 11

        },

        ads: {

            fov: 52,

            speed: 14

        }

    },

    sniper: {

        name: "Sniper",

        damage: 100,

        fireRate: 900,

        magazine: 5,

        reloadTime: 2600,

        range: 1000,

        recoil: {

            up: 0.16,

            side: 0.01,

            recovery: 6

        },

        ads: {

            fov: 20,

            speed: 8

        }

    }

};
