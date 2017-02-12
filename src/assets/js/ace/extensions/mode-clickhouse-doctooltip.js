
function createInfoDataTip(data, includeType, activeArg) {
    var tip = elt("span", null);

    var d = data.doc;
    var params = data.params || parseJsDocParams(d); //parse params

    if (includeType) {
        var fnArgs = data.fnArgs ? data.fnArgs : data.type ? parseFnType(data.type) : null; //will be null if parseFnType detects that this is not a function
        if (fnArgs) {
            var getParam = function (arg, getChildren) {
                if (params === null) return null;
                if (!arg.name) return null;
                var children = [];
                for (var i = 0; i < params.length; i++) {
                    if (getChildren === true) {
                        if (params[i].parentName.toLowerCase().trim() === arg.name.toLowerCase().trim()) {
                            children.push(params[i]);
                        }
                    }
                    else {
                        if (params[i].name.toLowerCase().trim() === arg.name.toLowerCase().trim()) {
                            return params[i];
                        }
                    }
                }
                if (getChildren === true) return children;
                return null;
            };
            var getParamDetailedName = function (param) {
                var name = param.name;
                if (param.optional === true) {
                    if (param.defaultValue) {
                        name = "[" + name + "=" + param.defaultValue + "]";
                    }
                    else {
                        name = "[" + name + "]";
                    }
                }
                return name;
            };
            var useDetailedArgHints = params.length === 0 || !isNaN(parseInt(activeArg));
            var typeStr = '';
            typeStr += htmlEncode(data.exprName || data.name || "fn");
            typeStr += "(";
            var activeParam = null,
                activeParamChildren = []; //one ore more child params for multiple object properties

            for (var i = 0; i < fnArgs.args.length; i++) {
                var paramStr = '';
                var isCurrent = !isNaN(parseInt(activeArg)) ? i === activeArg : false;
                var arg = fnArgs.args[i]; //name,type
                var name = arg.name || "?";
                if (name.length > 1 && name.substr(name.length - 1) === '?') {
                    name = name.substr(0, name.length - 1);
                    arg.name = name; //update the arg var with proper name for use below
                }

                if (!useDetailedArgHints) {
                    paramStr += htmlEncode(name);
                }
                else {
                    var param = getParam(arg, false);
                    var children = getParam(arg, true);
                    var type = arg.type;
                    var optional = false;
                    var defaultValue = '';
                    if (param !== null) {
                        name = param.name;
                        if (param.type) {
                            type = param.type;
                        }
                        if (isCurrent) {
                            activeParam = param;
                        }
                        optional = param.optional;
                        defaultValue = param.defaultValue.trim();
                    }
                    if (children && children.length > 0) {
                        if (isCurrent) {
                            activeParamChildren = children;
                        }
                        type = "{";
                        for (var c = 0; c < children.length; c++) {
                            type += children[c].name;
                            if (c + 1 !== children.length && children.length > 1) type += ", ";
                        }
                        type += "}";
                    }
                    paramStr += type ? '<span class="' + cls + 'type">' + htmlEncode(type) + '</span> ' : '';
                    paramStr += '<span class="' + cls + (isCurrent ? "farg-current" : "farg") + '">' + (htmlEncode(name) || "?") + '</span>';
                    if (defaultValue !== '') {
                        paramStr += '<span class="' + cls + 'jsdoc-param-defaultValue">=' + htmlEncode(defaultValue) + '</span>';
                    }
                    if (optional) {
                        paramStr = '<span class="' + cls + 'jsdoc-param-optionalWrapper">' + '<span class="' + cls + 'farg-optionalBracket">[</span>' + paramStr + '<span class="' + cls + 'jsdoc-param-optionalBracket">]</span>' + '</span>';
                    }
                }
                if (i > 0) paramStr = ', ' + paramStr;
                typeStr += paramStr;
            }

            typeStr += ")";
            if (fnArgs.rettype) {
                if (useDetailedArgHints) {
                    typeStr += ' -> <span class="' + cls + 'type">' + htmlEncode(fnArgs.rettype) + '</span>';
                }
                else {
                    typeStr += ' -> ' + htmlEncode(fnArgs.rettype);
                }
            }
            typeStr = '<span class="' + cls + (useDetailedArgHints ? "typeHeader" : "typeHeader-simple") + '">' + typeStr + '</span>'; //outer wrapper
            if (useDetailedArgHints) {
                if (activeParam && activeParam.description) {
                    typeStr += '<div class="' + cls + 'farg-current-description"><span class="' + cls + 'farg-current-name">' + activeParam.name + ': </span>' + activeParam.description + '</div>';
                }
                if (activeParamChildren && activeParamChildren.length > 0) {
                    for (var i = 0; i < activeParamChildren.length; i++) {
                        var t = activeParamChildren[i].type ? '<span class="' + cls + 'type">{' + activeParamChildren[i].type + '} </span>' : '';
                        typeStr += '<div class="' + cls + 'farg-current-description">' + t + '<span class="' + cls + 'farg-current-name">' + getParamDetailedName(activeParamChildren[i]) + ': </span>' + activeParamChildren[i].description + '</div>';
                    }
                }
            }
            tip.appendChild(elFromString(typeStr));
        }
    }
    if (isNaN(parseInt(activeArg))) {
        if (data.doc) {
            var replaceParams = function (str, params) {
                if (params.length === 0) {
                    return str;
                }
                str = str.replace(/@param/gi, '@param'); //make sure all param tags are lowercase
                var beforeParams = str.substr(0, str.indexOf('@param'));
                while (str.indexOf('@param') !== -1) {
                    str = str.substring(str.indexOf('@param') + 6); //starting after first param match
                }
                if (str.indexOf('@') !== -1) {
                    str = str.substr(str.indexOf('@')); //start at next tag that is not a param
                }
                else {
                    str = ''; //@param was likely the last tag, trim remaining as its likely the end of a param description
                }
                var paramStr = '';
                for (var i = 0; i < params.length; i++) {
                    paramStr += '<div>';
                    if (params[i].parentName.trim() === '') {
                        paramStr += ' <span class="' + cls + 'jsdoc-tag">@param</span> ';
                    }
                    else {
                        paramStr += '<span class="' + cls + 'jsdoc-tag-param-child">&nbsp;</span> '; //dont show param tag for child param
                    }
                    paramStr += params[i].type.trim() === '' ? '' : '<span class="' + cls + 'type">{' + params[i].type + '}</span> ';

                    if (params[i].name.trim() !== '') {
                        var name = params[i].name.trim();
                        if (params[i].parentName.trim() !== '') {
                            name = params[i].parentName.trim() + '.' + name;
                        }
                        var pName = '<span class="' + cls + 'jsdoc-param-name">' + name + '</span>';
                        if (params[i].defaultValue.trim() !== '') {
                            pName += '<span class="' + cls + 'jsdoc-param-defaultValue">=' + params[i].defaultValue + '</span>';
                        }
                        if (params[i].optional) {
                            pName = '<span class="' + cls + 'jsdoc-param-optionalWrapper">' + '<span class="' + cls + 'farg-optionalBracket">[</span>' + pName + '<span class="' + cls + 'jsdoc-param-optionalBracket">]</span>' + '</span>';
                        }
                        paramStr += pName;
                    }
                    paramStr += params[i].description.trim() === '' ? '' : ' - <span class="' + cls + 'jsdoc-param-description">' + params[i].description + '</span>';
                    paramStr += '</div>';
                }
                if (paramStr !== '') {
                    str = '<span class="' + cls + 'jsdoc-param-wrapper">' + paramStr + '</span>' + str;
                }

                return beforeParams + str;
            };
            var highlighTags = function (str) {
                try {
                    str = ' ' + str + ' '; //add white space for regex
                    var re = / ?@\w{1,50}\s ?/gi;
                    var m;
                    while ((m = re.exec(str)) !== null) {
                        if (m.index === re.lastIndex) {
                            re.lastIndex++;
                        }
                        str = str.replace(m[0], ' <span class="' + cls + 'jsdoc-tag">' + m[0].trim() + '</span> ');
                    }
                }
                catch (ex) {
                    showError(ts, editor, ex);
                }
                return str.trim();
            };
            var highlightTypes = function (str) {
                str = ' ' + str + ' '; //add white space for regex
                try {
                    var re = /\s{[^}]{1,50}}\s/g;
                    var m;
                    while ((m = re.exec(str)) !== null) {
                        if (m.index === re.lastIndex) {
                            re.lastIndex++;
                        }
                        str = str.replace(m[0], ' <span class="' + cls + 'type">' + m[0].trim() + '</span> ');
                    }
                }
                catch (ex) {
                    showError(ts, editor, ex);
                }
                return str.trim();
            };
            var createLinks = function (str) {
                try {
                    var httpProto = 'HTTP_PROTO_PLACEHOLDER';
                    var httpsProto = 'HTTPS_PROTO_PLACEHOLDER';
                    var re = /\bhttps?:\/\/[^\s<>"`{}|\^\[\]\\]+/gi;
                    var m;
                    while ((m = re.exec(str)) !== null) {
                        if (m.index === re.lastIndex) {
                            re.lastIndex++;
                        }
                        var withoutProtocol = m[0].replace(/https/i, httpsProto).replace(/http/i, httpProto);
                        var text = m[0].replace(new RegExp('https://', 'i'), '').replace(new RegExp('http://', 'i'), '');
                        str = str.replace(m[0], '<a class="' + cls + 'tooltip-link" href="' + withoutProtocol + '" target="_blank">' + text + ' </a>');
                    }
                    str = str.replace(new RegExp(httpsProto, 'gi'), 'https').replace(new RegExp(httpProto, 'gi'), 'http');
                }
                catch (ex) {
                    showError(ts, editor, ex);
                }
                return str;
            };

            if (d.substr(0, 1) === '*') {
                d = d.substr(1); //tern leaves this for jsDoc as they start with /**, not exactly sure why...
            }
            d = htmlEncode(d.trim());
            d = replaceParams(d, params);
            d = highlighTags(d);
            d = highlightTypes(d);
            d = createLinks(d);
            tip.appendChild(elFromString(d));
        }
        if (data.url) {
            tip.appendChild(document.createTextNode(" "));
            var link = elt("a", null, "[docs]");
            link.target = "_blank";
            link.href = data.url;
            tip.appendChild(link);
        }
        if (data.origin) {
            tip.appendChild(elt("div", null, elt("em", null, "source: " + data.origin)));
        }
    }
    return tip;
}