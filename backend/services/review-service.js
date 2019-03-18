const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function addReview({ userId, toyId, content }) {
    var review = {
        userId: new ObjectId(userId),
        toyId: new ObjectId(toyId),
        content
    }
    return mongoService.connect()
        .then(db => db.collection('review').insertOne(review))
        // .then (({insertedId: _id}) => ({...review, _id}))
        .then(res => {
            return getById(res.insertedId)
        })
}

function getUserReviews(userId) {
    const id = new ObjectId(userId)
    return mongoService.connect()
        .then(db =>
            db.collection('review').aggregate([
                {
                    $match: { userId: id }
                },
                {
                    $lookup:
                    {
                        from: 'toy',
                        localField: 'toyId',
                        foreignField: '_id',
                        as: 'toy'
                    }
                }, {
                    $unwind: '$toy'
                }
            ]).toArray()
        )

}


function query({ userId = null, toyId = null } = {}) {
    const criteria = {}
    if (userId) criteria.userId = new ObjectId(userId)
    if (toyId) criteria.toyId = new ObjectId(toyId)
    return mongoService.connect().then(db => {
        return db.collection('review')
            .aggregate([
                {
                    $match: criteria
                },
                {
                    $lookup:
                    {
                        from: 'toy',
                        localField: 'toyId',
                        foreignField: '_id',
                        as: 'toy'
                    }
                },
                {
                    $unwind: '$toy'
                },
                {
                    $lookup:
                    {
                        from: 'user',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                }
            ]).toArray()
    })
}




module.exports = {
    query,
    getUserReviews,
    addReview
}