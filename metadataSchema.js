/**metaData Schema **/
'use strict';
var cmxMetaDataSchema, creatorSchema, versionsSchema;

versionsSchema = {
    format: String,
    id: String,
    "default": Boolean
};

creatorSchema = {
    name: String,
    credit: String,
    url: String
};

cmxMetaDataSchema = {
    _id: String,
    id: String,
    issue: Number,
    title: String,
    thumb: String,
    series: {
        name: String,
        id: String
    },
    creators: [ creatorSchema ],
    versions: [ versionsSchema ],
    view: {},
    published: Number
};

module.exports = cmxMetaDataSchema;