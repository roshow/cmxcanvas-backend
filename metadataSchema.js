/**metaData Schema **/
'use strict';
var metaDataSchema, creatorSchema, formatsSchema;

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

metaDataSchema = {
    id: String,
    issue: Number,
    title: String,
    thumb: String,
    series: {
        name: String,
        id: String
    },
    creators: [ creatorSchema ],
    formats: [ formatsSchema ],
    view: {},
    view_id: String,
    published: Boolean
};

module.exports = metaDataSchema;