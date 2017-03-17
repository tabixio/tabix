'use strict';

var fs = require('fs');
var conf = require('./conf');

module.exports = function(file) {

    var loaderName = 'tabix.loader.js';
    var html = file.contents.toString();

    var scripts = html.match(/\<script\s+src=\"[^\"]+\"/gm).map(function(script) {
        var matches = script.match(/\<script\s+src=\"([^\"]+)\"/);
        return matches && matches.length ? matches[1] : '';
    });
    var styles = html.match(/link\s+rel=\"stylesheet\"\s+href=\"[^\"]+\"/gm).map(function(style) {
        var matches = style.match(/link\s+rel=\"stylesheet\"\s+href=\"([^\"]+)\"/);
        return matches && matches.length ? matches[1] : '';
    });

    var loaderContent = `
    var domain = '';
    var elements = document.getElementsByTagName("script");
    for (var i = 0; i < elements.length; i++) {
        if (/${loaderName.replace(/\\./g, '\\.')}$/.test(elements[i].src)) {
            domain = elements[i].src.match(/(https?\\:\\/\\/[^\\/]+\\/)/)[1];
            break;
        }
    }

    function loadFile( filename ) {
        var fileref;
        if (/\.js$/.test( filename )) {
            fileref = document.createElement( 'script' );
            fileref.setAttribute( "type", "text/javascript" );
            fileref.setAttribute( "src", domain + filename );
        } else if (/\.css$/.test( filename )) {
            fileref = document.createElement( "link" );
            fileref.setAttribute( "rel", "stylesheet" );
            fileref.setAttribute( "type", "text/css" );
            fileref.setAttribute( "href", domain + filename );
        }
        document.getElementsByTagName( "head" )[ 0 ].appendChild( fileref );
    }

    [
    "${styles.join('",\n    "')}",
    "${scripts.join('",\n    "')}"
    ].forEach(loadFile);`;

    // `<!doctype html><html ng-app="SMI2"><head><meta charset="utf-8"><title>Tabix.io</title><base href="/"></head><body><div ui-view="" class="content-ui"></div>
    // <script src="http://beta.tabix.io/scripts/tabix.loader.js"></script>
    // </body></html>`;


    fs.writeFileSync(conf.paths.dist + '/scripts/' + loaderName, loaderContent);
};
