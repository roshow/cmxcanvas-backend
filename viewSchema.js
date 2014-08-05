var viewSchema, panelSchema, popupSchema;

popupSchema = {
    bookId: String,
    panel: Number,
    popup: Number,
    path: String,
    src: String,
    transition: String,
    x: Number,
    y: Number
};

panelSchema = {
    bookId: String,
    panel: Number,
    popups: [ popupSchema ],
    src: String,
    path: String,
    transition: String
};

viewSchema = {

    _id: String,
    id: String,
    cmxMetaData: String,
    
    backgroundTextColor: String,
    backgroundColor: String,
    height: Number,
    width: Number,
    imgPath: String,
    move: {
        transition: String
    },

    panels: [ panelSchema ]
};

module.exports = viewSchema;