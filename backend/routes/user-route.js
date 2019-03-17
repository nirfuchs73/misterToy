const userService = require('../services/user-service')
// const reviewService = require('../services/review-service')
const BASE = '/user'

function addUserRoutes(app) {

    app.get('/user', (req, res) => {
        userService.query()
            .then(users => res.json(users))
    })

    app.get('/user/:id', (req, res) => {
        const userId = req.params.id
        Promise.all([
            userService.getById(userId),
            reviewService.query({ userId })
        ])
            .then(([user, reviews]) => {
                console.log({ user })
                res.json({ user, reviews })
            })
    })

    app.post('/singup', (req, res) => {
        const nickname = req.body.nickname
        userService.addUser({ nickname })
            .then(user => res.json(user))
    })

    app.put('/login', (req, res) => {
        console.log('login');
        const nickname = req.body.nickname
        console.log('nickname', nickname);
        userService.checkLogin({ nickname })
            .then(user => {
                req.session.user = user
                res.json(user)
            })
    })

    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.json({});
    });
}


module.exports = addUserRoutes;