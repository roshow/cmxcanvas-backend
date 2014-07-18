module.exports = {
    _id: String,
    id: String,
    cmxMetaData: String,
    url: String,
    JSON: [
        {
            bookId: String,
            panel: Number,
            popups: {
                type: Array,
                require: true,
                "default": []
            },
            src: String,
            transition: String,
        }
    ]
}