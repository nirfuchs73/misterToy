const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;

function query() {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('toys');
            return collection.find({}).toArray();
        })
}

function remove(toyId) {
    toyId = new ObjectId(toyId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('toys');
            return collection.remove({ _id: toyId })
                .then(res => {
                    // toy._id = res.insertedId
                    // return toy;
                });
        })
}

function getById(toyId) {
    toyId = new ObjectId(toyId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('toys');
            return collection.findOne({ _id: toyId });
        });
}

function add(toy) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('toys');
            return collection.insertOne(toy)
                .then(res => {
                    toy._id = res.insertedId
                    return toy;
                })
        })
}

function update(toy) {
    toy._id = new ObjectId(toy._id);
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('toys');
            return collection.updateOne({ _id: toy._id }, { $set: toy })
                .then(res => {
                    return toy;
                })
        })
}

module.exports = {
    query,
    remove,
    getById,
    add,
    update
}