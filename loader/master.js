var cssId = 'TabixCss';
var tabix_build = "201706";

window.global_tabix_embedded = true;

if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'http://ui.tabix.io/styles/app.css?build='+tabix_build;
    link.media = 'all';
    head.appendChild(link);


    var sc = document.createElement('script');
    sc.type = 'text/javascript';
    sc.async = false;// !not ASYNC!
    sc.src = 'http://ui.tabix.io/scripts/app.js?build='+tabix_build;
    sc.charset = 'utf-8';
    head.appendChild(sc);


}


