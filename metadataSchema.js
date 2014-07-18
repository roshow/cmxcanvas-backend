module.exports = {
    _id: String,
    id: String,
    issue: Number,
    title: String,
    thumb: String,
    series: {
        name: String,
        id: String
    },
    creators: [
        {
            name: String,
            credit: String,
            url: String
        }
    ],
    img: {
        url: String
    },
    cmxJSON: {},
    published: Number
}