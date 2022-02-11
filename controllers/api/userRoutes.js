const router = require('express').Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const newUser = await User.create({
            ...req.body,
            user_id: req.session.user_id,
        })
    }
})