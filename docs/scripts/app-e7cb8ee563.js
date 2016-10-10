!function(){"use strict";var e=window.smi2=window.smi2||{};e.app={name:"SMI2"},angular.module(e.app.name,["ngAnimate","ui.router","LocalStorageModule","lumx","angularScreenfull","ui.ace","ui.grid","ui.grid.autoResize"])}(),angular.module("SMI2").run(["$templateCache",function(e){e.put("app/database/database.html",'<ui-view><div class="pl pr" flex-container="row" flex-wrap=""><div class="card" flex-item="6"><ul class="list"><li class="list-row list-row--has-separator" ng-repeat="table in vars.tables"><div class="list-row__primary"><lx-icon lx-id="table" lx-size="s" lx-color="grey" lx-type="flat"></lx-icon></div><div class="list-row__content"><a href="" ui-sref="table({tableName: table.name})"><span class="tc-black">{{table.name}}</span></a></div></li></ul></div></div></ui-view>'),e.put("app/dashboard/dashboard.html",'<div class="pl pr" flex-container="row" flex-wrap=""><div class="card" flex-item="6"><ul class="list"><li class="list-row list-row--has-separator" ng-repeat="database in vars.databases"><div class="list-row__primary"><lx-icon lx-id="database" lx-size="s" lx-color="grey" lx-type="flat"></lx-icon></div><div class="list-row__content"><a href="" ui-sref="database({dbName: database.name})"><span class="tc-black">{{database.name}}</span></a></div></li></ul></div></div>'),e.put("app/login/login.html",'<div class="wrapper"><div class="header"><div class="card bgc-blue-500 tc-white"><div class="toolbar"><div class="toolbar__left mr"><img src="assets/images/logo.png" class="logo"></div><div class="toolbar__label fs-title header-title"><a ui-sref="dashboard" class="tc-white">Clickhouse</a></div></div></div></div><div class="content" style="margin-top: 2px"><div class="sidebar-view"><div class="sidebar"><ul class="sidebar-menu p"><li class="menu-item p" ng-repeat="base in vars.bases"><a class="tc-black link" href="" ng-click="vars.db = base"><div class="fs-body" style="display: inline-block; line-height: 30px; width: 180px; overflow: hidden; text-overflow: ellipsis">{{base.name}}</div><span class="tc-grey-400 fs-body-2">{{base.host}}</span></a></li></ul></div></div><div class="content"><div class="main-content"><div class="main-view"><div class="login-view"><form name="vars.loginForm" class="card"><div class="card__header p+">Подключение</div><div ng-if="vars.error" class="login-message error fs-body-1"><p class="tc-white">Неверные данные</p></div><div class="card__body p++"><lx-text-field label="название" fixed-label="true" icon="border-color"><input type="text" ng-model="vars.db.name" name="name" required="required"></lx-text-field><lx-text-field label="хост:порт" fixed-label="true" icon="server"><input type="text" ng-model="vars.db.host" name="host" required="required"></lx-text-field><lx-text-field label="логин" fixed-label="true" icon="account"><input type="text" ng-model="vars.db.login" name="login"></lx-text-field><lx-text-field label="пароль" fixed-label="true" icon="key"><input type="password" ng-model="vars.db.password" ng-click="onKeypress($event)"></lx-text-field></div><div class="card__actions text-center p+"><button ng-disabled="vars.loginForm.$invalid" ng-class="{\'btn--is-disabled\': vars.loginForm.$invalid}" lx-ripple="lx-ripple" class="btn btn--l btn--blue btn--raised btn-login" ng-click="login()">Войти</button> <button ng-if="vars.db.id" lx-ripple="lx-ripple" class="btn btn--l btn--red btn--raised btn-login" ng-click="remove()">Удалить</button></div></form></div></div></div></div></div><div class="footer"><div class="toolbar"><p class="copyright tc-white text-center"><a href="https://github.com/smi2" target="_blank" class="tc-white">СМИ2</a> &copy; {{::vars.year}}, все права защищены</p><a href="https://github.com/smi2/clickhouse-frontend" target="_blank"><i class="mdi mdi-github-circle tc-white fs-display-1"></i></a></div></div></div>'),e.put("app/base/404.html",'<div class="not-found-view text-center"><h2>404 не найдено</h2><lx-button lx-color="blue" ui-sref="dashboard"><i class="mdi mdi-arrow-left"></i> Назад</lx-button></div>'),e.put("app/base/base.html",'<div class="wrapper"><header ui-view="header" class="header-view"></header><div class="content"><div ui-view="sidebar" ng-class="{\'show\': showSidebar}" class="sidebar-view"></div><div class="main-content"><div ui-view="breadcrumb" class="breadcrumb-view"></div><div ui-view="main" class="p"></div></div></div></div>'),e.put("app/base/breadcrumbs.html",'<ol ng-if="$root.breadcrumbs" class="breadcrumb p+"><li class="home-item"><a ui-sref="dashboard" lx-ripple="lx-ripple" class="btn btn--xs btn--white btn--fab"><i class="mdi mdi-home"></i></a></li><li ng-repeat="nav in $root.breadcrumbs" class="breadcrumb-item"><i class="icon tc-white icon--xs mdi mdi-chevron-right"></i> <a ng-if="!$last" ui-sref="{{nav.link}}(nav.params)" class="btn btn--xs btn--white btn--raised">{{nav.text}}</a> <span ng-if="$last" class="tc-white">{{nav.text}}</span></li></ol>'),e.put("app/base/header.html",'<div class="header"><div class="card bgc-blue-500 tc-white"><div class="toolbar"><div class="toolbar__left mr"><button lx-ripple="lx-ripple" ng-if="hasSidebar" ng-click="vm.switchSidebar()" class="btn btn--l btn--white btn--icon hide-gt-sm"><i class="mdi mdi-menu"></i></button> <img src="assets/images/logo.png" class="logo"></div><div class="toolbar__label fs-title header-title"><a ui-sref="dashboard" class="tc-white">Clickhouse</a></div><div class="toolbar__right"><a ui-sref="sql" href="" lx-tooltip="SQL" lx-tooltip-position="bottom" lx-ripple="white" class="btn btn--l btn--white btn--icon"><i class="mdi mdi-console"></i></a> <a ng-click="logout()" href="" lx-tooltip="Выход" lx-tooltip-position="bottom" lx-ripple="white" class="btn btn--l btn--white btn--icon"><i class="mdi mdi-lock"></i></a> <span class="header-user-name hide-sm p+">{{user}}</span></div></div></div></div>'),e.put("app/base/sidebar.html",'<div class="sidebar" ng-app="sidebar"><lx-dropdown class="p"><lx-dropdown-toggle class="pt"><lx-button lx-color="blue" style="min-width: 180px"><span class="float-left"><i class="icon icon--s icon--flat mdi mdi-database"></i> {{vars.selectedDatabase.name}}</span></lx-button></lx-dropdown-toggle><lx-dropdown-menu><ul><li ng-repeat="database in vars.databases" ng-click="changeDatabase(database)"><a class="dropdown-link">{{database.name}}</a></li></ul></lx-dropdown-menu></lx-dropdown><ul class="sidebar-menu p"><li class="menu-item p" ng-repeat="table in vars.tables"><a class="tc-black link" href="" ui-sref="table({dbName: vars.selectedDatabase.name, tableName: table.name})"><i class="icon icon--s icon--grey icon--flat mdi mdi-table"></i><div style="line-height: 30px;display: inline-block;width: 132px;overflow: hidden;text-overflow: ellipsis;" class="ng-binding" lx-tooltip="{{table.name}}" lx-tooltip-position="right">{{table.name}}</div></a></li></ul></div>'),e.put("app/table/table.html",'<div class="pl pr" flex-container="row" flex-wrap=""><div flex-item="6" class="pr+"><div class="card"><div class="data-table-container"><header class="data-table-header"><div class="data-table-header__label"><span class="fs-title">{{vars.name}}</span></div><div class="data-table-header__actions"><lx-button lx-size="l" lx-color="black" lx-type="icon" ui-sref="view"><i class="mdi mdi-eye"></i></lx-button></div></header><table class="data-table"><thead><tr class="data-table-row"><th style="width: 40px"></th><th style="width: 40%">Название</th><th style="width: 10%">Тип</th><th style="width: 10%">Default тип</th><th style="width: 10%">Значение</th></tr></thead><tbody><tr class="data-table-row" ng-repeat="field in vars.data.data"><td class="tc-grey-400">{{$index + 1}}</td><td ng-repeat="key in [\'name\', \'type\', \'default_type\', \'default_expression\'] track by $index">{{field[key]}}</td></tr></tbody></table></div></div></div><div flex-item="6"><div class="card" flex-item="6"><ui-view></ui-view></div></div></div>'),e.put("app/sql/sql.html",'<script src="https://cdnjs.cloudflare.com/ajax/libs/screenfull.js/2.0.0/screenfull.js"></script><div ngsf-fullscreen="fullscreenCtrl" class="fullscreen"><div class="card mb+" style="background: #f2f2f2"><div class="pl+ pt+ pb+ pr"><div class="float-right" style="margin-top: -5px"><lx-text-field lx-label="Шрифт" lx-fixed-label="true" lx-icon="format-size" style="width: 60px; float: left; margin-top: -5px; margin-right: 15px;"><input type="text" ng-model="vars.fontSize"></lx-text-field><lx-button lx-position="right" lx-over-toggle="true" ng-click="fullscreenCtrl.toggleFullscreen()"><i class="mdi mdi-fullscreen"></i></lx-button><lx-dropdown lx-position="right" lx-over-toggle="true"><lx-dropdown-toggle><lx-button lx-color="black" lx-type="flat">{{vars.theme}}</lx-button></lx-dropdown-toggle><lx-dropdown-menu><ul><li ng-repeat="theme in vars.themes"><a class="dropdown-link" ng-click="setTheme(theme)">{{theme}}</a></li></ul></lx-dropdown-menu></lx-dropdown><lx-dropdown lx-position="right" lx-over-toggle="true"><lx-dropdown-toggle><lx-button lx-color="black" lx-type="flat">{{vars.format.name}}</lx-button></lx-dropdown-toggle><lx-dropdown-menu><ul><li ng-repeat="format in vars.formats"><a class="dropdown-link" ng-click="vars.format = format">{{format.name}}</a></li></ul></lx-dropdown-menu></lx-dropdown><lx-dropdown lx-position="right" lx-over-toggle="true" lx-width="250"><lx-dropdown-toggle><lx-button lx-color="black" lx-type="icon"><i class="mdi mdi-history"></i></lx-button></lx-dropdown-toggle><lx-dropdown-menu><ul ng-if="vars.sqlHistory.length == 0"><li class="tc-grey-400 pl fs-body-2">История запросов пуста</li></ul><ul ng-if="vars.sqlHistory.length > 0"><li ng-repeat="item in vars.sqlHistory track by $index"><a class="dropdown-link" ng-click="vars.sql = item">{{item}}</a></li></ul></lx-dropdown-menu></lx-dropdown></div>SQL</div><div class="card__actions" style="background: #f2f2f2"><div style="min-height: 200px; position: relative;" id="resizable"><div ng-model="vars.sql" ui-ace="{ useWrapMode : true, mode: \'clickhouse\', onLoad: aceLoaded, advanced: { enableBasicAutocompletion: true } }" style="min-height: 200px; width: 100%; height: 100%; border-bottom: 3px #eee solid; border-right: 3px #eee solid;"></div></div><lx-text-field lx-label="max_result_rows" lx-fixed-label="true" lx-icon="tune-vertical" style="width: 60px; float: right; margin-top: -5px; margin-right: 15px;"><input type="text" ng-model="vars.limitRows"></lx-text-field><lx-button lx-color="green mt" ng-click="run()"><i class="mdi mdi-play"></i><span id="sql_button">{{vars.button_run}}</span></lx-button></div></div><div class="card" ng-repeat="item in vars.resultsQuery"><div class="p+" style="background: #f3f3f3"><div style="white-space: nowrap; float: right; line-height: 0px; color: #666;" class="fs-caption" ng-if="item.statistics">время: <b>{{item.statistics.elapsed}}</b>, строк прочитано: <b>{{item.statistics.rows_read}}</b>, байт прочитано: <b>{{item.statistics.bytes_read}}</b></div></div><div class="card__actions p+" style="max-height: 560px; overflow-x: auto; overflow-y: auto;"><span ng-if="item.result === null" class="fs-caption">нет данных</span><div ng-if="item.result !== null" ng-bind-html="item.result">x</div></div></div></div>'),e.put("app/table/view/view.html",'<div class="pl+ pt+ pb+ pr fs-title"><div class="float-right" style="margin-top: -5px"><lx-button lx-size="l" lx-color="black" lx-type="icon" ng-click="loadPrev()" ng-disabled="vars.offset === 0"><i class="mdi mdi-arrow-left"></i></lx-button><lx-button lx-size="l" lx-color="black" lx-type="icon" ng-click="loadNext()"><i class="mdi mdi-arrow-right"></i></lx-button></div>Данные <span class="tc-grey-400">c {{vars.offset}} по {{vars.offset + vars.limit}}</span></div><div class="card__actions p+" style="max-height: 560px; overflow-x: auto; overflow-y: auto;"><span ng-if="vars.data === null" class="fs-caption">нет данных</span><lx-progress lx-type="linear" lx-color="teal" ng-if="vars.data == -1"></lx-progress><div ng-if="vars.data !== null && vars.data != -1" ng-bind-html="vars.data"></div></div>')}]),function(e,t){"use strict";function a(e,t,a,r,i){t.breadcrumbs=[{text:"База "+a.dbName,link:"database"},{text:"Таблица "+a.tableName,link:"table"},{text:"Просмотр",link:"view"}],e.vars={data:null,grid:null,limit:100,offset:0},e.load=function(){e.vars.data=-1,i.query("select * from "+a.dbName+"."+a.tableName+" limit "+e.vars.offset+", "+e.vars.limit).then(function(t){e.vars.data=i.dataToHtml(t)},function(e){r.error("Ошибка "+e)})},e.loadNext=function(){e.vars.offset+=e.vars.limit,e.load()},e.loadPrev=function(){e.vars.offset>0&&(e.vars.offset-=e.vars.limit,e.load())},e.load()}e.module(t.app.name).controller("ViewController",a),a.$inject=["$scope","$rootScope","$stateParams","LxNotificationService","API"]}(angular,smi2),function(e,t){"use strict";function a(e,t,a,r){t.breadcrumbs=[{text:"База "+a.dbName,link:"database"},{text:"Таблица "+a.tableName,link:"table"}],e.vars={data:{},name:a.tableName},r.query("describe table "+a.dbName+"."+a.tableName).then(function(t){e.vars.data=t})}e.module(t.app.name).controller("TableController",a),a.$inject=["$scope","$rootScope","$stateParams","API"]}(angular,smi2),global_keywords_fields="",global_keywords_tables="",function(e,t){"use strict";function a(t,a,r,i,s,n){t.vars={sql:"",button_run:"Выполнить ⌘ + ⏎",sqlHistory:i.get("sqlHistory")||[],format:{},resultsQuery:[],formats:[{name:"Таблица",sql:" format JSON",render:"html"},{name:"JSON compact",sql:" format JSONCompact"}],db:null,editor:null,limitRows:i.get("editorLimitRows")||500,fontSize:i.get("editorFontSize")||16,theme:i.get("editorTheme")||"cobalt"},t.vars.format=t.vars.formats[0],t.vars.themes=["ambiance","eclipse","mono_industrial","tomorrow_night_blue","chaos","github","monokai","tomorrow_night_bright","chrome","idle_fingers","pastel_on_dark","tomorrow_night_eighties","clouds","iplastic","solarized_dark","tomorrow_night","clouds_midnight","katzenmilch","solarized_light","twilight","cobalt","kr_theme","sqlserver","vibrant_ink","crimson_editor","kuroir","terminal","xcode","dawn","merbivore","textmate","dreamweaver","merbivore_soft","tomorrow"],a.breadcrumbs=!1,r.onbeforeunload=function(e){if(""!==t.vars.sql&&"localhost"!=location.hostname){var a="Хотите покинуть страницу?";return"undefined"==typeof e&&(e=window.event),e&&(e.returnValue=a),a}};var l=t.$on("$stateChangeStart",function(e){var a="Хотите покинуть страницу?";e.defaultPrevented||""===t.vars.sql||confirm(a)||e.preventDefault()});t.$on("$destroy",function(){l(),r.onbeforeunload=null}),t.isFullscreen=!1,t.toggleFullScreen=function(){t.isFullscreen=!t.isFullscreen},t.executeQuery=function(a,r,l){var o="";t.vars.limitRows&&(o+="max_result_rows="+t.vars.limitRows+"&result_overflow_mode=throw"),n.query(a.sql,a.format,!0,o).then(function(e){if("object"!=typeof e){var s=e,e={};e.data=s,e.meta=null,e.rows=null,e.statistics=null}e.error=!1,e.query=a,t.vars.resultsQuery.push(t.renderResult(e)),a.index+1<r.length?t.executeQuery(r[a.index+1],r):(-1==t.vars.sqlHistory.indexOf(t.vars.sql)&&(t.vars.sqlHistory.push(t.vars.sql),t.vars.sqlHistory.length>25&&t.vars.sqlHistory.shift(),i.set("sqlHistory",t.vars.sqlHistory)),t.renderFinalResult())},function(r){s.error("Ошибка");var i={};i.meta=null,i.rows=null,i.query=a,i.statistics=null,r.data?i.error=e.toJson(r.data).replace(/\\n/gi,"<br/>").replace(/^"/,"").replace(/"$/,""):i.error=r,t.vars.resultsQuery.push(t.renderResult(i)),t.renderFinalResult()})},t.renderResult=function(t){return"string"==typeof t.error?t.result='<pre class="fs-caption tc-red-700">'+t.error+"</pre>":"object"!=typeof t.data?"string"!=typeof t.data?t.result='<pre class="fs-caption">'+e.toJson(t.data,!0)+"</pre>":t.result='<pre class="fs-caption">'+t.data+"</pre>":t.result=n.dataToHtml(t),t.data=!1,t},t.renderFinalResult=function(){},t.run=function(){var e=t.vars.sql,a=0,r=t.vars.editor.getSelectedText();if(""!==r&&null!==r&&(e=r),""===e||null===e)return void s.warning("Не введен SQL");t.vars.resultsQuery=[];var i=[],n=t.vars.editor.session.$mode.splitByTokens(e,"constant.character.escape",";;");n.forEach(function(e){var r=null,s=!1,n=!1,l=null,o=t.vars.editor.session.$mode.findTokens(e,"storage",!0),d=t.vars.editor.session.$mode.findTokens(e,"keyword",!0);o.hasOwnProperty("value")?(r=!1,n=o.value):(r=" FORMAT JSON ",s=!0),d.hasOwnProperty("value")&&(l=d.value),"select"!==l&&(r=!1,s=!1),i.push({sql:e,index:a,format:r,setedformat:s,keyword:l,storage:n}),a++}),t.executeQuery(i[0],i)},t.setTheme=function(e){t.vars.theme=e,t.vars.editor.setTheme("ace/theme/"+e),i.set("editorTheme",e)},t.aceSettings=function(){t.vars.editor.execCommand("showSettingsMenu")},t.selectDatabase=function(e){t.vars.db=e,n.query("SELECT table,name,type FROM system.columns WHERE database='"+e+"'",t.vars.format.sql,!0).then(function(a){var r=[],i={},s=[],n={},l=[];a.meta.forEach(function(e){l.push(e.name)}),a.data.forEach(function(e){l.forEach(function(t){"table"==t&&(n.hasOwnProperty(e[t])||(n[e[t]]=1,s.push(e[t]))),"name"==t&&(i.hasOwnProperty(e[t])||(i[e[t]]=1,r.push(e[t])))})}),global_keywords_fields=r.join("|")+"|",global_keywords_tables=s.join("|")+"|"+e,t.vars.editor.session.setMode({path:"ace/mode/clickhouse",v:Date.now()}),t.vars.editor.session.bgTokenizer.start(0)})},t.aceLoaded=function(a){t.vars.editor=a,a.setOptions({fontSize:t.vars.fontSize+"px"}),a.setTheme("ace/theme/"+t.vars.theme),a.commands.addCommand({name:"myCommand",bindKey:{win:"Ctrl-Enter",mac:"Command-Enter"},exec:function(){t.run()}}),t.vars.editor.clearSelection(),a.on("changeSelection",function(){a.getSelectedText()?t.vars.button_run="Выполнить выделенное ⌘ + ⏎":t.vars.button_run="Выполнить ⌘ + ⏎",document.getElementById("sql_button").innerHTML=t.vars.button_run}),a.focus(),a.selection.moveTo(0,0);var r=e.element($("[ng-app=sidebar]")).scope();r&&r.$watch("vars.selectedDatabase.name",function(a){e.isUndefined(a)||t.selectDatabase(a)}),"localhost"!=location.hostname?t.vars.sql=t.vars.sqlHistory[0]:t.vars.sql=";;select 0 as ping;;\nselect 1 as ping;;select 2 as ping\n;;select 3+sleep(0.1) as ping;;select 4+sleep(0.1) as ping;;\nSELECT 5 As PING format JSON;;select 6 as ping\n;;select 7 as ping FORMAT CSVWithNames"},t.$watch("vars.limitRows",function(e){i.set("editorLimitRows",e)}),t.$watch("vars.fontSize",function(e){e&&t.vars.editor&&(t.vars.editor.setOptions({fontSize:e+"px"}),i.set("editorFontSize",e))}),e.element("#resizable").resizable({handles:"s"})}e.module(t.app.name).controller("SqlController",a),a.$inject=["$scope","$rootScope","$window","localStorageService","LxNotificationService","API"]}(angular,smi2);var define=window.define||window.ace.define;define("ace/mode/clickhouse_highlight_rules",["$rootScope","require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var a=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,i=function(){var e="SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|AND|OR|GROUP|BY|ORDER|LIMIT|OFFSET|HAVING|AS|WHEN|ELSE|END|TYPE|LEFT|RIGHT|JOIN|ON|OUTER|DESC|ASC|UNION|CREATE|TABLE|PRIMARY|KEY|IF|FOREIGN|NOT|REFERENCES|DEFAULT|NULL|INNER|CROSS|NATURAL|DATABASE|DROP|GRANT|ANY|ATTACH|DETACH|DESCRIBE|OPTIMIZE|PREWHERE|TOTALS|DATABASES|PROCESSLIST|SHOW",t="FORMAT\\W+JSON|FORMAT\\W+JSONCompact|FORMAT\\W+JSONEachRow|FORMAT\\W+TSKV|FORMAT\\W+TabSeparated|FORMAT\\W+TabSeparatedWithNames|FORMAT\\W+TabSeparatedWithNamesAndTypes|FORMAT\\W+TabSeparatedRaw|FORMAT\\W+BlockTabSeparated|FORMAT\\W+CSV|FORMAT\\W+CSVWithNames",a="true|false",r="avg|count|first|last|max|min|sum|ucase|lcase|mid|len|round|rank|now|coalesce|ifnull|isnull|nvl|countIf|timeSlot|yesterday|today|now|toRelativeSecondNum|toRelativeMinuteNum|toRelativeHourNum|toRelativeDayNum|toRelativeWeekNum|toRelativeMonthNum|toRelativeYearNum|toTime|toStartOfHour|toStartOfFiveMinute|toStartOfMinute|toStartOfYear|toStartOfQuarter|toStartOfMonth|toMonday|toSecond|toMinute|toHour|toDayOfWeek|toDayOfMonth|toMonth|toYear|toFixedString|toStringCutToZero|reinterpretAsString|reinterpretAsDate|reinterpretAsDateTime|reinterpretAsFloat32|reinterpretAsFloat64|reinterpretAsInt8|reinterpretAsInt16|reinterpretAsInt32|reinterpretAsInt64|reinterpretAsUInt8|reinterpretAsUInt16|reinterpretAsUInt32|reinterpretAsUInt64|toUInt8|toUInt16|toUInt32|toUInt64|toInt8|toInt16|toInt32|toInt64|toFloat32|toFloat64|toDate|toDateTime|toString|bitAnd|bitOr|bitXor|bitNot|bitShiftLeft|bitShiftRight|abs|negate|modulo|intDivOrZero|intDiv|divide|multiply|minus|plus|empty|notEmpty|length|lengthUTF8|lower|upper|lowerUTF8|upperUTF8|reverse|reverseUTF8|concat|substring|substringUTF8|appendTrailingCharIfAbsent|position|positionUTF8|match|extract|extractAll|like|notLike|replaceOne|replaceAll|replaceRegexpOne|range|arrayElement|has|indexOf|countEqual|arrayEnumerate|arrayEnumerateUniq|arrayJoin|arrayMap|arrayFilter|arrayExists|arrayCount|arrayAll|arrayFirst|arraySum|splitByChar|splitByString|alphaTokens|domainWithoutWWW|topLevelDomain|firstSignificantSubdomain|cutToFirstSignificantSubdomain|queryString|URLPathHierarchy|URLHierarchy|extractURLParameterNames|extractURLParameters|extractURLParameter|queryStringAndFragment|cutWWW|cutQueryString|cutFragment|cutQueryStringAndFragment|cutURLParameter|IPv4NumToString|IPv4StringToNum|IPv4NumToStringClassC|IPv6NumToString|IPv6StringToNum|rand|rand64|halfMD5|MD5|sipHash64|sipHash128|cityHash64|intHash32|intHash64|SHA1|SHA224|SHA256|URLHash|hex|unhex|bitmaskToList|bitmaskToArray|floor|ceil|round|roundToExp2|roundDuration|roundAge|regionToCountry|regionToContinent|regionToPopulation|regionIn|regionHierarchy|regionToName|OSToRoot|OSIn|OSHierarchy|SEToRoot|SEIn|SEHierarchy|dictGetUInt8|dictGetUInt16|dictGetUInt32|dictGetUInt64|dictGetInt8|dictGetInt16|dictGetInt32|dictGetInt64|dictGetFloat32|dictGetFloat64|dictGetDate|dictGetDateTime|dictGetString|dictGetHierarchy|dictHas|dictIsIn|uniq|argMin|argMax|uniqCombined|uniqHLL12|uniqExact|groupArray|groupUniqArray|quantile|quantileDeterministic|quantileTiming|quantileTimingWeighted|quantileExact|quantileExactWeighted|quantileTDigest|median|quantiles|varSamp|varPop|stddevSamp|stddevPop|covarSamp|covarPop|corr|sequenceMatch|sequenceCount|uniqUpTo|countIf|avgIf|quantilesTimingIf|argMinIf|uniqArray|sumArray|quantilesTimingArrayIf|uniqArrayIf|medianIf|quantilesIf|varSampIf|varPopIf|stddevSampIf|stddevPopIf|covarSampIf|covarPopIf|corrIf|uniqArrayIf|sumArrayIf",i="int|numeric|decimal|date|varchar|char|bigint|float|double|bit|binary|text|set|timestamp|money|real|number|integer|uint8|uint16|uint32|uint64|int8|int16|int32|int64|float32|float64|datetime|enum8|enum16|array|tuple",s=this.createKeywordMapper({"support.function":r,keyword:e,"constant.language":a,"storage.type":i,"markup.bold":global_keywords_tables,"markup.heading":global_keywords_fields},"identifier",!0);this.$rules={start:[{token:"comment",regex:"--.*$",caseInsensitive:!0},{token:"comment",start:"/\\*",end:"\\*/"},{token:"string",regex:'".*?"'},{token:"storage",regex:t},{token:"string",regex:"'.*?'"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:s,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"constant.character.escape",regex:/;{2}/},{token:"punctuation",regex:/[?:,;.]/},{token:"keyword.operator",regex:"\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\(]"},{token:"paren.rparen",regex:"[\\)]"},{token:"text",regex:"\\s+"}]},this.normalizeRules();var n=[],l=function(e,t){e.forEach(function(e){n.push({name:e,value:e,score:0,meta:t})})};l(r.split("|"),"function"),l(e.split("|"),"keyword"),l("FORMAT JSON|FORMAT JSONCompact|FORMAT JSONEachRow|FORMAT TSKV|FORMAT TabSeparated|FORMAT TabSeparatedWithNames|FORMAT TabSeparatedWithNamesAndTypes|FORMAT TabSeparatedRaw|FORMAT BlockTabSeparated|FORMAT CSV|FORMAT CSVWithNames".split("|"),"keyword"),l(i.split("|"),"type"),l(global_keywords_tables.split("|"),"storage"),l(global_keywords_fields.split("|"),"storage"),this.completions=n};a.inherits(i,r),t.ClickhouseHighlightRules=i}),define("ace/mode/clickhouse",["require","exports","module","ace/lib/oop","ace/mode/text","ace/token_iterator","ace/mode/clickhouse_highlight_rules","ace/range"],function(e,t){"use strict";var a=e("../lib/oop"),r=e("./text").Mode,i=e("./clickhouse_highlight_rules").ClickhouseHighlightRules,s=function(){this.HighlightRules=i};a.inherits(s,r),function(){this.lineCommentStart="--",this.getCompletions=function(e,t){return t.$mode.$highlightRules.completions},this.$id="ace/mode/clickhouse",this.findTokens=function(t,a,r){t=t.replace(/^(\r\n|\n|\r)/gm,"").replace(/(\r\n|\n|\r)$/gm,"");for(var i=e("ace/token_iterator").TokenIterator,s=e("ace/edit_session").EditSession,n=new s(t,this),l=new i(n,0,0),o=l.getCurrentToken(),d=[];o;){var c=o;if(c.row=l.getCurrentTokenRow(),c.col=l.getCurrentTokenColumn(),c.type==a&&(d.push(c),r))return c.value=c.value.toLowerCase(),c;o=l.stepForward()}return d},this.splitByTokens=function(t,a,r){t=t.replace(/^(\r\n|\n|\r)/gm,"").replace(/(\r\n|\n|\r)$/gm,"");for(var i=e("ace/token_iterator").TokenIterator,s=e("ace/edit_session").EditSession,n=e("ace/range").Range,l=new s(t,this),o=new i(l,0,0),d=o.getCurrentToken(),c=[],u=0,p=0;d;){var m=d;if(m.row=o.getCurrentTokenRow(),m.col=o.getCurrentTokenColumn(),m.type==a&&m.value==r){var b=new n(u,p,m.row,m.col+r.length),v=l.getTextRange(b);u=m.row,p=m.col+r.length,v=v.trim().replace(new RegExp("^"+r+"|"+r+"$","g"),"").trim().replace(/^(\r\n|\n|\r)/gm,"").replace(/(\r\n|\n|\r)$/gm,""),v.length>2&&c.push(v)}d=o.stepForward()}var b=new n(u,p,Number.MAX_VALUE,Number.MAX_VALUE),v=l.getTextRange(b);return v=v.trim().replace("^("+r+")","").replace(r+"$","").trim().replace(/^(\r\n|\n|\r)/gm,"").replace(/(\r\n|\n|\r)$/gm,""),v=v.replace(new RegExp("^"+r+"|"+r+"$","g"),"").trim().replace(/^(\r\n|\n|\r)/gm,"").replace(/(\r\n|\n|\r)$/gm,""),v.length>2&&c.push(v),c}}.call(s.prototype),t.Mode=s}),function(e,t){"use strict";function a(e,t){return{responseError:function(a){return 401==a.status&&t.get("$state").go("login"),e.reject(a)}}}e.module(t.app.name).service("HttpInterceptor",a),a.$inject=["$q","$injector"]}(angular,smi2),function(e,t){"use strict";function a(t,a,r){var i="currentBaseConfig",s=null,n={},l=r.get(i);l&&l.host&&(n=l),this.setConnection=function(e){r.set(i,e),n=e},this.clear=function(){s=null,n={},r.set(i,{})},this.query=function(r,i,l,o){var d=a.defer();if(i!==!1){i=i||" FoRmAt JSON","null"==i&&(i="");var c=r+" "+i}else var c=r;var u="http://"+n.host+"/?query="+encodeURIComponent(c);n.login&&(u+="&user="+n.login),n.password&&(u+="&password="+n.password),u+="&add_http_cors_header=1",l&&(u+="&database="+s),o&&(u+="&"+o),console.info(c);var p={method:"GET",url:u,transformResponse:function(t,a,r){try{return e.fromJson(t)}catch(i){return t+"\nStatus:"+r+"\nHeaders:"+e.toJson(a())}}};return i?t(p).then(function(e){d.resolve(e.data)},function(e){d.reject(e.data)}):t.post(u).then(function(e){d.resolve(e.data)},function(e){d.reject(e)}),d.promise},this.getConnectionInfo=function(){return n},this.setDatabase=function(e){s=e},this.getDatabase=function(){return s},this.dataToHtml=function(e){var t='<table class="sql-table fs-body-1"><tr>',a=[];return e.meta.forEach(function(e){t+="<th>"+e.name+'<div class="fs-caption tc-grey-400">'+e.type+"</div></th>",a.push(e.name)}),e.data.forEach(function(e){t+="<tr>",a.forEach(function(a){t+="<td>"+e[a]+"</td>"}),t+="</tr>"}),t+="</table>"},this.dataToUIGrid=function(e){var t=[];return e.meta.forEach(function(e){t.push({field:e.name,minWidth:100,enableColumnResizing:!0,headerTooltip:e.type})}),{enableSorting:!0,enableFiltering:!0,enableColumnResizing:!0,columnDefs:t,enableGridMenu:!0,enableSelectAll:!0,showGridFooter:!0,showColumnFooter:!0,data:e.data}}}e.module(t.app.name).service("API",a),a.$inject=["$http","$q","localStorageService"]}(angular,smi2),function(e,t){"use strict";function a(e,t,a,r,i){var s="basesConfig";e.vars={bases:r.get(s)||[],db:{},error:!1},e.login=function(){if(e.vars.error=!1,e.vars.db.id){for(var a=0;a<e.vars.bases.length;a++)if(e.vars.bases[a].id==e.vars.db.id){e.vars.bases[a]=e.vars.db;break}}else e.vars.db.id=(new Date).getTime(),e.vars.bases.push(e.vars.db);r.set(s,e.vars.bases),i.setConnection(e.vars.db),i.query("SELECT 'login success'").then(function(){t.go("dashboard")},function(){e.vars.error=!0})},e.remove=function(){for(var t=0;t<e.vars.bases.length;t++)if(e.vars.bases[t].id==e.vars.db.id){e.vars.bases.splice(t,1);break}r.set(s,e.vars.bases),e.vars.db={}}}e.module(t.app.name).controller("LoginController",a),a.$inject=["$scope","$state","$filter","localStorageService","API"]}(angular,smi2),function(e,t){"use strict";function a(e,t,a,r){t.breadcrumbs=[{text:"База "+a.dbName,link:"database",params:a}],e.vars={tables:[]},r.query("show tables from "+a.dbName).then(function(t){e.vars.tables=t.data})}e.module(t.app.name).controller("DatabaseController",a),a.$inject=["$scope","$rootScope","$stateParams","API"]}(angular,smi2),function(e,t){"use strict";function a(e,t,a){t.breadcrumbs=[{text:"Рабочий стол",link:"dashboard"}],e.vars={databases:[]},a.query("show databases").then(function(t){e.vars.databases=t.data})}e.module(t.app.name).controller("DashboardController",a),a.$inject=["$scope","$rootScope","API"]}(angular,smi2),function(e,t){"use strict";function a(e,t){e.vars={databases:[],selectedDatabase:null,tables:[]},e.changeDatabase=function(a){e.vars.selectedDatabase=a,t.setDatabase(a.name),t.query("show tables from "+a.name).then(function(t){e.vars.tables=t.data})},t.query("show databases").then(function(t){e.vars.databases=t.data,e.changeDatabase(t.data[0])})}e.module(t.app.name).controller("SidebarController",a),a.$inject=["$scope","API"]}(angular,smi2),function(e,t){"use strict";function a(e,t,a){e.user=a.getConnectionInfo().name,e.logout=function(){a.clear(),t.go("login")}}e.module(t.app.name).controller("HeaderController",a),a.$inject=["$scope","$state","API"]}(angular,smi2),function(){"use strict";angular.module(smi2.app.name).run(["$rootScope","$state",function(e,t){e.breadcrumbs=[];var a=e.$on("$stateChangeError",function(e,a,r,i,s,n){"notAuthorized"==n&&t.go("login")});e.$on("$destroy",function(){a()})}])}(),function(){"use strict";angular.module(smi2.app.name).config(["$stateProvider",function(e){e.state("base",{"abstract":!0,resolve:{session:["$q","API",function(e,t){var a=e.defer();return angular.isDefined(t.getConnectionInfo().host)?a.resolve():a.reject("notAuthorized"),a.promise}]},templateUrl:"app/base/base.html"}).state("layout",{parent:"base","abstract":!0,views:{header:{templateUrl:"app/base/header.html",controller:"HeaderController"},sidebar:{templateUrl:"app/base/sidebar.html",controller:"SidebarController"},breadcrumb:{templateUrl:"app/base/breadcrumbs.html"},main:{template:"<ui-view/>"}}}).state("dashboard",{parent:"layout",url:"/",templateUrl:"app/dashboard/dashboard.html",controller:"DashboardController"}).state("login",{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController"}).state("sql",{parent:"layout",url:"/sql",templateUrl:"app/sql/sql.html",controller:"SqlController"}).state("database",{parent:"layout",url:"/database/{dbName}",templateUrl:"app/database/database.html",controller:"DatabaseController"}).state("table",{parent:"database",url:"/table/{tableName}",templateUrl:"app/table/table.html",controller:"TableController"}).state("view",{parent:"table",url:"/view",templateUrl:"app/table/view/view.html",controller:"ViewController"}).state("404",{parent:"base",templateUrl:"app/base/404.html"})}])}(),function(e,t){"use strict";e.module(t.app.name).config(["$locationProvider","$httpProvider","$sceProvider","$urlRouterProvider",function(e,t,a,r){e.html5Mode(!0).hashPrefix("!"),t.interceptors.push("HttpInterceptor"),a.enabled(!1),r.otherwise(function(e){var t=e.get("$state");t.transitionTo("404")})}])}(angular,smi2);