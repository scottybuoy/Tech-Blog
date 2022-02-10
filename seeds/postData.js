const { Post } = require("../models");

const postData = [
    {
        title: "jQuery",
        content: "I think jQuery is kinda dope :D",
        user_id: 1

    },
    {
        title: "Model-View-Controller",
        content: "MVC is the MVP oh boy",
        user_id: 2
    },
    {
        title: "CSS Frameworks",
        content: "Do any professional web developers use plain css?",
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;

