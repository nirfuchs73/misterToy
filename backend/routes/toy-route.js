const toyService = require('../services/toy-service.js');
// const reviewService = require('../services/review-service.js')

function checkAdmin(req, res, next) {
    console.log('INSIDE MIDDLEWARE: ', req.session.user);
    if (!req.session.user || !req.session.user.isAdmin) {
        res.status(401).end('Unauthorized');
        return;
    }
    next();
}

function addToyRoutes(app) {
    // TOYS REST API:

    // LIST
    app.get('/toy', (req, res) => {
        const filterBy = req.query;
        // console.log('FILTER BY', filterBy);
        toyService.query(filterBy)
            .then(toys => res.json(toys));
    })

    // SINGLE - GET Full details
    app.get('/toy/:toyId', (req, res) => {
        const toyId = req.params.toyId;
        toyService.getById(toyId)
            .then(toy => res.json(toy))
            .catch(err => {
                console.error('Problems:', err);
                res.status(500).send('Toy not Found');
            });
    })

    // DELETE
    app.delete('/toy/:toyId', checkAdmin, (req, res) => {
        const toyId = req.params.toyId;
        toyService.remove(toyId)
            .then(() => res.end())
            .catch(err => {
                res.end('Not able to remove toy');
            })
    })

    // CREATE
    app.post('/toy', checkAdmin, (req, res) => {
        const toy = req.body;
        toyService.add(toy)
            .then(toy => res.json(toy))
            .catch(err => {
                res.end('Not able to create toy');
            })
    })

    // UPDATE
    app.put('/toy/:toyId', checkAdmin, (req, res) => {
        const toy = req.body;
        toyService.update(toy)
            .then(toy => res.json(toy))
            .catch(err => {
                res.end('Not able to update toy');
            });
    })
}

module.exports = addToyRoutes;