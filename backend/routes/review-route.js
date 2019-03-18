const reviewService = require('../services/review-service.js')
// const BASE = '/review';

function addRoutes(app) {

    app.get('/review', (req, res) => {
        reviewService.query(req.query)
            .then(reviews => {
                res.json(reviews)
            })
    })

    app.post('/review', (req, res) => {
        var review = {
            // userId: req.session.userId
            userId: req.body.userId,
            toyId: req.body.toyId,
            content: req.body.content
        }

        reviewService.addReview(review)
            .then(review => res.json(review))
    })
}


module.exports = addRoutes;