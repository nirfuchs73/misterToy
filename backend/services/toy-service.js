const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;

function query() {
    return mongoService.connect()
        .then(db => db.collection('toys').find({}).toArray())
}

function remove(toyId) {
    const id = new ObjectId(toyId)
    return mongoService.connect()
        .then(db => db.collection('toys').remove({ _id: id }))
        .then(res => {
            // toy._id = res.insertedId
            // return toy;
        })
}

function getById(id) {
    const _id = new ObjectId(id)
    return mongoService.connect()
        .then(db => db.collection('toys').findOne({ _id }))
}

function add(toy) {
    return mongoService.connect()
        .then(db => db.collection('toys').insertOne(toy))
        .then(res => {
            toy._id = res.insertedId
            return toy;
        })
}

function update(toy) {
    toy._id = new ObjectId(toy._id);
    return mongoService.connect()
        .then(db => db.collection('toys').updateOne({ _id: toy._id }, { $set: toy }))
        .then(res => {
            return toy;
        })
}

module.exports = {
    query,
    remove,
    getById,
    add,
    update
}