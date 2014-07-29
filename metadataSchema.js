/**metaData Schema **/
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
    versions: [
        {
            format: String,
            id: String,
            "default": Boolean
        }
    ],
    view: {},
    published: Number
};