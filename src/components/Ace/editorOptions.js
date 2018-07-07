const editorOptions = [
    'minLines',
    'maxLines',
    'readOnly',
    'highlightActiveLine',
    'tabSize',
    'enableBasicAutocompletion',
    'enableLiveAutocompletion',
    'enableSnippets',
]

const editorEvents = [
    'onChange',
    'onFocus',
    'onInput',
    'onBlur',
    'onCopy',
    'onPaste',
    'onSelectionChange',
    'onCursorChange',
    'onScroll',
    'handleOptions',
    'updateRef',
];
const debounce=(fn, delay)=>{
    let timer = null;
    return function () {
        let context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
};
export {
    editorOptions,
    editorEvents,
    debounce,
};