ace.define("ace/theme/darcula",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

// base by cobalt
exports.isDark = true;
exports.cssClass = "ace-darcula";
exports.cssText =`
.ace-darcula .ace_gutter {
  background: #2b2b2b;
  color: rgb(128,145,160)
}

.ace-darcula .ace_print-margin {
  width: 1px;
  background: #2b2b2b
}

.ace-darcula {
  background-color: #2b2b2b;
  color: #FFFFFF
}

.ace-darcula .ace_cursor {
  color: #FFFFFF
}

.ace-darcula .ace_marker-layer .ace_selection {
  background: rgba(179, 101, 57, 0.75)
}

.ace-darcula.ace_multiselect .ace_selection.ace_start {
  box-shadow: 0 0 3px 0px #002240;
}

.ace-darcula .ace_marker-layer .ace_step {
  background: rgb(127, 111, 19)
}

.ace-darcula .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid rgba(255, 255, 255, 0.15)
}

.ace-darcula .ace_marker-layer .ace_active-line {
  background: rgba(0, 0, 0, 0.35)
}

.ace-darcula .ace_gutter-active-line {
  background-color: rgba(0, 0, 0, 0.35)
}

.ace-darcula .ace_marker-layer .ace_selected-word {
  border: 1px solid rgba(179, 101, 57, 0.75)
}

.ace-darcula .ace_invisible {
  color: rgba(255, 255, 255, 0.15)
}

.ace-darcula .ace_keyword,
.ace-darcula .ace_meta {
  color: #cc7832
}

.ace-darcula .ace_constant,
.ace-darcula .ace_constant.ace_character,
.ace-darcula .ace_constant.ace_character.ace_escape,
.ace-darcula .ace_constant.ace_other {
  color: #6897bb
}

.ace-darcula .ace_invalid {
  color: #F8F8F8;
  background-color: #800F00
}

.ace-darcula .ace_support {
  color: #80FFBB
}

.ace-darcula .ace_support.ace_constant {
  color: #EB939A
}

.ace-darcula .ace_fold {
  background-color: #FF9D00;
  border-color: #FFFFFF
}

.ace-darcula .ace_support.ace_function {
  color: #FFB054
}

.ace-darcula .ace_storage {
  color: #FFEE80
}

.ace-darcula .ace_entity {
  color: #FFDD00
}

.ace-darcula .ace_string {
  color: #3AD900
}

.ace-darcula .ace_string.ace_regexp {
  color: #80FFC2
}

.ace-darcula .ace_comment {
  font-style: italic;
  color: #808080
}

.ace-darcula .ace_heading,
.ace-darcula .ace_markup.ace_heading {
  color: #C8E4FD;
  background-color: #001221
}

.ace-darcula .ace_list,
.ace-darcula .ace_markup.ace_list {
  background-color: #130D26
}

.ace-darcula .ace_variable {
  color: #9876aa
}

.ace-darcula .ace_variable.ace_language {
  color: #FF80E1
}

.ace-darcula .ace_meta.ace_tag {
  color: #9EFFFF
}

.ace-darcula .ace_indent-guide {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYHCLSvkPAAP3AgSDTRd4AAAAAElFTkSuQmCC) right repeat-y
}
`;

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
