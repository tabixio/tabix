const activeKey = (obj, key) => (obj[key] ? `${key}` : '');

/**
 * create class name
 *
 * @param {Object} obj - object data
 * @param {String} basiClass - basic name class
 */
export default (obj = {}, basicClass = '') => ({
    className: Object.keys(obj)
        .reduce((accum, key) => `${accum} ${activeKey(obj, key)}`, basicClass)
        .trim()
});
