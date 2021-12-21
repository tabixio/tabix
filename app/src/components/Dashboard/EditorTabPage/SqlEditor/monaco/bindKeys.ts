import * as monaco from 'monaco-editor';
import SqlEditor from '../SqlEditor';

type tMonaco = typeof monaco;
export function bindKeys(
  codeEditor: monaco.editor.IStandaloneCodeEditor,
  thisMonaco: tMonaco,
  sqlEditor: SqlEditor
): void {
  // Bind keys

  const KM = thisMonaco.KeyMod;
  const KC = thisMonaco.KeyCode;

  // ======== Command-Enter ========
  codeEditor.addAction({
    id: 'my-exec-code',
    label: 'Exec current query`s',
    keybindings: [KM.CtrlCmd | KC.Enter], // eslint-disable-line no-bitwise
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1.5,
    run(editor) {
      sqlEditor.execQueries(editor, false);
    },
  });
  // ======== Shift-Command-Enter ========
  codeEditor.addAction({
    id: 'my-exec-all',
    label: 'Exec All query',
    keybindings: [KM.Shift | KM.CtrlCmd | KC.Enter], // eslint-disable-line no-bitwise
    precondition: undefined,
    keybindingContext: undefined,
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1.5,
    run(editor) {
      sqlEditor.execQueries(editor, true);
    },
  });
  // ======== Command+Shift+- / Command+Shift+= ========
  codeEditor.addCommand(
    KM.chord(KM.Shift | KM.CtrlCmd | KC.Minus, 0), // eslint-disable-line no-bitwise
    () => {
      codeEditor.getAction('editor.foldAll').run();
    },
    ''
  );
  codeEditor.addCommand(
    KM.chord(KM.Shift | KM.CtrlCmd | KC.Equal, 0), // eslint-disable-line no-bitwise
    () => {
      codeEditor.getAction('editor.unfoldAll').run();
    },
    ''
  );
  // ======== Shift-CtrlCmd-F ========
  codeEditor.addCommand(
    KM.chord(KM.Shift | KM.CtrlCmd | KC.KeyF, 0), // eslint-disable-line no-bitwise
    () => {
      codeEditor.getAction('editor.action.formatDocument').run();
    },
    ''
  );
  // ======== Cmd-Y ========
  codeEditor.addCommand(
    KM.chord(KM.CtrlCmd | KC.KeyY, 0), // eslint-disable-line no-bitwise
    () => {
      codeEditor.getAction('editor.action.deleteLines').run();
    },
    ''
  );

  // @todo: Command-Shift-[NUM]
  // for (let i = 0; i < 9; i++) {
  //     editor.addCommand(globalMonaco.KeyMod.chord( globalMonaco.KeyMod.Shift | globalMonaco.KeyMod.CtrlCmd | globalMonaco.KeyCode['KEY_'+i]), function() {
  //         console.warn('actionChangeTab',i);
  //         self.actionChangeTab(i);
  // });
  // }

  // @todo:  Command-Left | Command-Right | Shift-Alt-Command-Right | Shift-Alt-Command-Right

  codeEditor.focus();
}
