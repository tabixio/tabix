const R = require('ramda');

export default (props, items) =>
    items.reduce((accum, key) => {
        const clearKey = key.trim();
        return props[clearKey] !== undefined
            ? R.assoc(clearKey, props[clearKey], accum)
            : accum;
    }, {});
