// Place bower components order here
var order = [
    {
        regex: /d3\/d3\.js/,
        priority: 1
    },
    {
        regex: /c3\/c3\.js/,
        priority: 2
    }
];


function orderBowerComponents (file) {
    var html = file.contents.toString();
    var matches = html.match(/^\s+\<script\s+src=\".*\/bower_components\/[^"]+\"\>\<\/script\>/gm);
    var result = [];

    order.sort(function(a, b) {
        return - a.priority + b.priority;
    }).forEach(function(item) {
        for (var i = matches.length-1; i >= 0; i--) {
            if (item.regex.test(matches[i])) {
                result.push(matches[i]);
                matches.splice(i, 1);
            }
        }
    });

    html = html.replace(
        /\<\!-- bower\:js --\>((.|\n)*?)(\s+)<\!-- endbower --\>/gm,
        '<!-- bower:js -->\n' + result.concat(matches).join('\n') + '\n$3<!-- endbower -->'
    );

    file.contents = new Buffer(html);
}

module.exports = orderBowerComponents;
