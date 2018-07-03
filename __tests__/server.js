const express = require('express');
const path = require('path');
const app = express();

module.exports = () => {
    app.use(
        '/assets',
        express.static(path.join(__dirname, '../public/assets'))
    );

    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, '../public/', 'index.html'));
    });

    return new Promise(resolve => {
        const result = app.listen(4100, () => {
            resolve(result);
        });
    });
};
