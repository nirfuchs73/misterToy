const toyService = require('../services/toy-service.js');
// const reviewService = require('../services/review-service.js')


function addToyRoutes(app) {
    // TOYS REST API:

    // LIST
    app.get('/toy', (req, res) => {
        toyService.query()
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
    app.delete('/toy/:toyId', (req, res) => {
        const toyId = req.params.toyId;
        toyService.remove(toyId)
            .then(() => res.end())
            .catch(err => {
                res.end('Not able to remove toy');
            })
    })

    // CREATE
    app.post('/toy', (req, res) => {
        const toy = req.body;
        toyService.add(toy)
            .then(toy => res.json(toy))
            .catch(err => {
                res.end('Not able to create toy');
            })
    })

    // UPDATE
    app.put('/toy/:toyId', (req, res) => {
        const toy = req.body;
        toyService.update(toy)
            .then(toy => res.json(toy))
            .catch(err => {
                res.end('Not able to update toy');
            });
    })
}

module.exports = addToyRoutes;