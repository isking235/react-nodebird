const express = require('express');
const bcrypt = require('bcrypt');
const {user} = require('../models');

const reuter = express.Router();

reuter.post('/', async (req, res, next) => { //POST /user/

    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if(exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.'); //중복시 return은 중요하다.
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,

        });
        res.send('ok');
    }catch (error) {
        console.error(error);
        next(error);
    }


});

module.exports = router;