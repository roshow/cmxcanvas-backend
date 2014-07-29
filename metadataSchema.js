module.exports = {
    _id: String,
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
    view: {
        height: Number,
        width: Number
    },
    versions: [
        {
            format: String,
            id: String,
            'default': Boolean
        }
    ],
    cmxJSON: {},
    published: Number
};