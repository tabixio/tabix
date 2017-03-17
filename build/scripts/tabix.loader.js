
    var domain = '';
    var elements = document.getElementsByTagName("script");
    for (var i = 0; i < elements.length; i++) {
        if (/tabix.loader.js$/.test(elements[i].src)) {
            domain = elements[i].src.match(/(https?\:\/\/[^\/]+\/)/)[1];
            break;
        }
    }

    function loadFile( filename ) {
        var fileref;
        if (/.js$/.test( filename )) {
            fileref = document.createElement( 'script' );
            fileref.setAttribute( "type", "text/javascript" );
            fileref.setAttribute( "src", domain + filename );
        } else if (/.css$/.test( filename )) {
            fileref = document.createElement( "link" );
            fileref.setAttribute( "rel", "stylesheet" );
            fileref.setAttribute( "type", "text/css" );
            fileref.setAttribute( "href", domain + filename );
        }
        document.getElementsByTagName( "head" )[ 0 ].appendChild( fileref );
    }

    [
    "styles/vendor-c09295f11b.css",
    "styles/app-1ca497950e.css",
    "assets/js/ace/ace/ace.js",
    "assets/js/ace/extensions/clickhouse_FoldMode.js",
    "assets/js/ace/extensions/clickhouse_highlight_rules.js",
    "assets/js/ace/extensions/ext-beautify.js",
    "assets/js/ace/extensions/ext-language_tools.js",
    "assets/js/ace/extensions/ext-settings_menu.js",
    "assets/js/ace/extensions/ext-spellcheck.js",
    "assets/js/ace/extensions/ext-statusbar.js",
    "assets/js/ace/extensions/ext-whitespace.js",
    "assets/js/ace/extensions/mode-clickhouse-doctooltip.js",
    "assets/js/ace/extensions/mode-clickhouse.js",
    "assets/js/ace/extensions/mode-php.js",
    "assets/js/ace/extensions/mode-sqlserver.js",
    "assets/js/ace/themes/theme-ambiance.js",
    "assets/js/ace/themes/theme-chaos.js",
    "assets/js/ace/themes/theme-chrome.js",
    "assets/js/ace/themes/theme-clouds.js",
    "assets/js/ace/themes/theme-clouds_midnight.js",
    "assets/js/ace/themes/theme-cobalt.js",
    "assets/js/ace/themes/theme-crimson_editor.js",
    "assets/js/ace/themes/theme-dawn.js",
    "assets/js/ace/themes/theme-dreamweaver.js",
    "assets/js/ace/themes/theme-eclipse.js",
    "assets/js/ace/themes/theme-github.js",
    "assets/js/ace/themes/theme-idle_fingers.js",
    "assets/js/ace/themes/theme-iplastic.js",
    "assets/js/ace/themes/theme-katzenmilch.js",
    "assets/js/ace/themes/theme-kr_theme.js",
    "assets/js/ace/themes/theme-kuroir.js",
    "assets/js/ace/themes/theme-merbivore.js",
    "assets/js/ace/themes/theme-merbivore_soft.js",
    "assets/js/ace/themes/theme-mono_industrial.js",
    "assets/js/ace/themes/theme-monokai.js",
    "assets/js/ace/themes/theme-pastel_on_dark.js",
    "assets/js/ace/themes/theme-solarized_dark.js",
    "assets/js/ace/themes/theme-solarized_light.js",
    "assets/js/ace/themes/theme-sqlserver.js",
    "assets/js/ace/themes/theme-terminal.js",
    "assets/js/ace/themes/theme-textmate.js",
    "assets/js/ace/themes/theme-tomorrow.js",
    "assets/js/ace/themes/theme-tomorrow_night.js",
    "assets/js/ace/themes/theme-tomorrow_night_blue.js",
    "assets/js/ace/themes/theme-tomorrow_night_bright.js",
    "assets/js/ace/themes/theme-tomorrow_night_eighties.js",
    "assets/js/ace/themes/theme-twilight.js",
    "assets/js/ace/themes/theme-vibrant_ink.js",
    "assets/js/ace/themes/theme-xcode.js",
    "scripts/vendor-baf27d548c.js",
    "scripts/app-0970180463.js"
    ].forEach(loadFile);