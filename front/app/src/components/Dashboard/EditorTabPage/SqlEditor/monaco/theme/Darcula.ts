import { editor } from 'monaco-editor';
// http://www.eclipsecolorthemes.org/?view=theme&id=14569

export const themeDarcula: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    {
      foreground: 'e1efff',
      token: 'punctuation - (punctuation.definition.string | punctuation.definition.comment)',
    },
    {
      foreground: 'ff628c',
      token: 'constant',
    },
    {
      foreground: 'ffdd00',
      token: 'entity',
    },
    {
      foreground: 'ff9d00',
      token: 'keyword',
    },
    {
      foreground: 'ffee80',
      token: 'storage',
    },
    {
      foreground: '3ad900',
      token: 'string -string.unquoted.old-plist -string.unquoted.heredoc',
    },
    {
      foreground: '3ad900',
      token: 'string.unquoted.heredoc string',
    },
    {
      foreground: '0088ff',
      fontStyle: 'italic',
      token: 'comment',
    },
    {
      foreground: '80ffbb',
      token: 'support',
    },
    {
      foreground: 'cccccc',
      token: 'variable',
    },
    {
      foreground: 'edef7d',
      token: 'predefined.sql',
    },
    {
      foreground: 'ff80e1',
      token: 'variable.language',
    },
    {
      foreground: 'ffee80',
      token: 'meta.function-call',
    },
    {
      foreground: 'f8f8f8',
      background: '800f00',
      token: 'invalid',
    },
    {
      foreground: 'ffffff',
      background: '223545',
      token: 'text source',
    },
    {
      foreground: 'ffffff',
      background: '223545',
      token: 'string.unquoted.heredoc',
    },
    {
      foreground: 'ffffff',
      background: '223545',
      token: 'source source',
    },
    {
      foreground: '80fcff',
      fontStyle: 'italic',
      token: 'entity.other.inherited-class',
    },
    {
      foreground: '9eff80',
      token: 'string.quoted source',
    },
    {
      foreground: '80ff82',
      token: 'string constant',
    },
    {
      foreground: '80ffc2',
      token: 'string.regexp',
    },
    {
      foreground: 'edef7d',
      token: 'string variable',
    },
    {
      foreground: '3AD900',
      token: 'string.sql',
    },
    {
      foreground: 'ffb054',
      token: 'support.function',
    },
    {
      foreground: 'eb939a',
      token: 'support.constant',
    },
    {
      foreground: 'ff1e00',
      token: 'support.type.exception',
    },
    {
      foreground: '8996a8',
      token: 'meta.preprocessor.c',
    },
    {
      foreground: 'afc4db',
      token: 'meta.preprocessor.c keyword',
    },
    {
      foreground: '73817d',
      token: 'meta.sgml.html meta.doctype',
    },
    {
      foreground: '73817d',
      token: 'meta.sgml.html meta.doctype entity',
    },
    {
      foreground: '73817d',
      token: 'meta.sgml.html meta.doctype string',
    },
    {
      foreground: '73817d',
      token: 'meta.xml-processing',
    },
    {
      foreground: '73817d',
      token: 'meta.xml-processing entity',
    },
    {
      foreground: '73817d',
      token: 'meta.xml-processing string',
    },
    {
      foreground: '9effff',
      token: 'meta.tag',
    },
    {
      foreground: '9effff',
      token: 'meta.tag entity',
    },
    {
      foreground: '9effff',
      token: 'meta.selector.css entity.name.tag',
    },
    {
      foreground: 'ffb454',
      token: 'meta.selector.css entity.other.attribute-name.id',
    },
    {
      foreground: '5fe461',
      token: 'meta.selector.css entity.other.attribute-name.class',
    },
    {
      foreground: '9df39f',
      token: 'support.type.property-name.css',
    },
    {
      foreground: 'f6f080',
      token: 'meta.property-group support.constant.property-value.css',
    },
    {
      foreground: 'f6f080',
      token: 'meta.property-value support.constant.property-value.css',
    },
    {
      foreground: 'f6aa11',
      token: 'meta.preprocessor.at-rule keyword.control.at-rule',
    },
    {
      foreground: 'edf080',
      token: 'meta.property-value support.constant.named-color.css',
    },
    {
      foreground: 'edf080',
      token: 'meta.property-value constant',
    },
    {
      foreground: 'eb939a',
      token: 'meta.constructor.argument.css',
    },
    {
      foreground: 'f8f8f8',
      background: '000e1a',
      token: 'meta.diff',
    },
    {
      foreground: 'f8f8f8',
      background: '000e1a',
      token: 'meta.diff.header',
    },
    {
      foreground: 'f8f8f8',
      background: '4c0900',
      token: 'markup.deleted',
    },
    {
      foreground: 'f8f8f8',
      background: '806f00',
      token: 'markup.changed',
    },
    {
      foreground: 'f8f8f8',
      background: '154f00',
      token: 'markup.inserted',
    },
    {
      background: '8fddf6',
      token: 'markup.raw',
    },
    {
      background: '004480',
      token: 'markup.quote',
    },
    {
      background: '130d26',
      token: 'markup.list',
    },
    {
      foreground: 'c1afff',
      background: '001221',
      fontStyle: 'bold',
      token: 'tabix',
    },
    {
      foreground: 'c1afff',
      fontStyle: 'bold',
      token: 'markup.bold',
    },
    {
      foreground: 'b8ffd9',
      fontStyle: 'italic',
      token: 'markup.italic',
    },
    {
      foreground: 'c8e4fd',
      background: '001221',
      fontStyle: 'bold',
      token: 'markup.heading',
    },
    {
      foreground: 'eb939a',
      background: '130d26',
      fontStyle: 'bold',
      token: 'warn-token.sql',
    },
    {
      foreground: 'CB772F',
      token: 'keyword.sql',
    },
    {
      foreground: '6897BB',
      token: 'number.sql',
    },
    {
      foreground: '6897BB',
      token: 'string.sql',
    },
  ],
  colors: {
    'editor.foreground': '#A9B7C6',
    'editor.background': '#2B2B2B', //002240
    'editor.selectionBackground': '#214283',
    'editor.lineHighlightBackground': '#323232',
    'editorCursor.foreground': '#FFFFFF',
    'editorWhitespace.foreground': '#FFFFFF',
  },
};
//
// <colorTheme id="14569" name="IntelliJ Idea 12 Darcula" modified="2013-02-28 20:27:10" author="Sergey">
// <searchResultIndication color="#000000" />
// <filteredSearchResultIndication color="#000000" />
// <occurrenceIndication color="#000000" />
// <writeOccurrenceIndication color="#000000" />
// <findScope color="#111111" />
// <deletionIndication color="#D25252" underline="false" strikethrough="false" />
// <sourceHoverBackground color="#000000" />
// <singleLineComment color="#808080" bold="false" italic="false" underline="false" strikethrough="false" />
// <multiLineComment color="#619647" italic="false" underline="false" strikethrough="false" />
// <commentTaskTag color="#619647" italic="false" underline="false" strikethrough="false" />
// <javadoc color="#619647" italic="false" underline="false" strikethrough="false" />
// <javadocLink color="#619647" italic="false" underline="false" strikethrough="false" />
// <javadocTag color="#619647" italic="false" underline="false" strikethrough="false" />
// <javadocKeyword color="#619647" italic="false" underline="false" strikethrough="false" />
// <class color="#A9B7C6" bold="false" underline="false" strikethrough="false" />
// <interface color="#A9B7C6" underline="false" strikethrough="false" />
// <method color="#A9B7C6" underline="false" strikethrough="false" />
// <methodDeclaration color="#FFC66D" underline="false" strikethrough="false" />
// <bracket color="#A9B7C6" underline="false" strikethrough="false" />
// <number color="#6897BB" underline="false" strikethrough="false" />
// <string color="#A5C25C" underline="false" strikethrough="false" />
// <operator color="#A9B7C6" underline="false" strikethrough="false" />
// <keyword color="#CB772F" bold="false" underline="false" strikethrough="false" />
// <annotation color="#A9B7C6" underline="false" strikethrough="false" />
// <staticMethod color="#BED6FF" underline="false" strikethrough="false" />
// <localVariable color="#7E7E7E" underline="false" strikethrough="false" />
// <localVariableDeclaration color="#A9B7C6" underline="false" strikethrough="false" />
// <field color="#9876AA" underline="false" strikethrough="false" />
// <staticField color="#9876AA" underline="false" strikethrough="false" />
// <staticFinalField color="#9876AA" italic="true" underline="false" strikethrough="false" />
// <deprecatedMember color="#D25252" underline="false" strikethrough="true" />
//   <enum color="#7FB347" underline="false" strikethrough="false" />
// <inheritedMethod color="#BED6FF" underline="false" strikethrough="false" />
// <abstractMethod color="#BED6FF" underline="false" strikethrough="false" />
// <parameterVariable color="#A9B7C6" underline="false" strikethrough="false" />
// <typeArgument color="#808080" underline="false" strikethrough="false" />
// <typeParameter color="#808080" underline="false" strikethrough="false" />
// <constant color="#9876AA" underline="false" strikethrough="false" />
// <background color="#2B2B2B" />
// <currentLine color="#323232" />
// <foreground color="#A9B7C6" />
// <lineNumber color="#A9B7C6" />
// <selectionBackground color="#214283" />
// <selectionForeground color="#A9B7C6" />
//   </colorTheme>
