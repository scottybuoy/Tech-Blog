const { User } = require("../models");

const userData = [
    {
        username: "quailman",
        email: "ineedmoreallowance@yahoo.com",
        password: "ilovepatty91"
    },
    {
        username: "raskolnikov",
        email: "siberiabound@gmail.com",
        password: "axemaniac"
    },
    {
        username: "wrathofsanity315",
        email: "earthcrisis@aol.com",
        password: "forevertrue"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;