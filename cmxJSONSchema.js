module.exports = {
    cmxMetaData: String,
    url: String,
    JSON: [
        {
            cmx_id: String,
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