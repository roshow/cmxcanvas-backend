/**metaData Schema **/
'use strict';
var cmxMetaDataSchema, creatorSchema, formatsSchema;

formatsSchema = {
    format: String,
    view_id: String,
    "default": Boolean,
    published: Boolean
};

creatorSchema = {
    name: String,
    credit: String,
    url: String
};

cmxMetaDataSchema = {
    id: String,
    issue: Number,
    title: String,
    thumb: String,
    series: {
        name: String,
        id: String
    },
    creators: [ creatorSchema ],
    versions: [ formatsSchema ],
    view: {},
    view_id: String,
    published: Boolean
};

module.exports = cmxMetaDataSchema;