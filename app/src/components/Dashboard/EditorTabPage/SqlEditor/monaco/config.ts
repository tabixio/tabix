import * as monaco from 'monaco-editor';

export const defaultOptions: monaco.editor.IEditorConstructionOptions = {
  // tabIndex
  minimap: { enabled: true, maxColumn: 60 },
  selectOnLineNumbers: true,
  automaticLayout: true, // Enable that the editor will install an interval to check if its container dom node size has changed. Enabling this might have a severe performance impact. Defaults to false.
  formatOnPaste: true,
  fontFamily: 'Monaco,Menlo,Ubuntu Mono,Consolas,"source-code-pro","monospace"',
  fontSize: 12,
  mouseWheelZoom: true,
  // cursorSmoothCaretAnimation: true,
  fontWeight: 'lighter',
  emptySelectionClipboard: true,
  formatOnType: true,
  showFoldingControls: 'always',
  folding: true,
  smoothScrolling: true,
  parameterHints: {
    enabled: true,
    cycle: false,
  },
  // snippetSuggestions: "bottom",
  scrollBeyondLastLine: false,
  inlayHints: {
    enabled: true,
  },
  // suggestOnTriggerCharacters: false,
  quickSuggestions: true,
  // disableLayerHinting: true, // fixes bug in FF
  // fixedOverflowWidgets: true,
  // wordBasedSuggestions: true,
  // wordBasedSuggestionsOnlySameLanguage
  //   {
  //   "other": true,
  //   "comments": false,
  //   "strings": true                 // this is the key setting, default is false3
  // },
  quickSuggestionsDelay: 200,
  // renderWhitespace: 'boundary',
  fontLigatures: true,
  // Enable auto indentation adjustment. Defaults to false. '"none" | "keep" | "brackets" | "advanced" | "full" | undefined'.
  autoIndent: 'full',
};
