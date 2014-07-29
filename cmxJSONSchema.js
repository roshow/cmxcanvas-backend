module.exports = {

    _id: String,
    id: String,
    cmxMetaData: String,

    backgroundTextColor: String,
    backgroundColor: String,
    height: Number,
    width: Number,
    move: {
        transition: String
    },

    panels: [
        {
            bookId: String,
            panel: Number,
            popups: [
                {
                    bookId: String,
                    panel: Number,
                    popup: Number,
                    path: String,
                    src: String,
                    transition: String,
                    x: Number,
                    y: Number
                }
            ],
            src: String,
            path: String,
            transition: String
        }
    ]
};