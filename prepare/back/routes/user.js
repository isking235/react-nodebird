const express = require('express');
const bcrypt = require('bcrypt');
const {User, Post} = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

const passport = require('passport');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /user
    try {
        if (req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: {id: req.user.id},
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]

            });

            res.status(200).json(fullUserWithoutPassword);
        } else {
            res.status(200).json(null);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:userId', async (req, res, next) => { // GET /user/1
    try {

        const fullUserWithoutPassword = await User.findOne({
            where: {id: req.params.userId},
            attributes: {
                exclude: ['password']
            },
            include: [{
                model: Post,
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }]

        });
        if(fullUserWithoutPassword) {
            const data = fullUserWithoutPassword.toJSON();
            data.Posts = data.Posts.length; //개인정보 침해 예방
            data.Followers = data.Followers.length;
            data.Followings = data.Followings.length;
            res.status(200).json(data);
        }else {
            res.status(404).json('존재하지 않는 사용자입니다.');
        }


    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local',(err, user, info) => {
        if(err) {
            console.error(err);
            next(err);
        }

        if (info) {
            return res.status(401).send(info.reason);
        }

        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: {id: user.id},
                attributes : {
                    exclude : ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model : User,
                    as : 'Followings',
                    attributes: ['id'],
                }, {
                    model : User,
                    as : 'Followers',
                    attributes: ['id'],
                }]

            });
            return res.status(200).json(fullUserWithoutPassword);

        });
    })(req, res, next);
});

router.post('/', isNotLoggedIn,async (req, res, next) => { //POST /user/

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
        res.status(201).send('ok');
    }catch (error) {
        console.error(error);
        next(error);
    }


});

router.post('/logout',isLoggedIn,(req,res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        await User.update({
            nickname: req.body.nickname,
        }, {
            where: {id: req.user.id},

        });
        res.status(200).json({nickname: req.body.nickname});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;