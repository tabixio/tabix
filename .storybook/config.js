import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

import 'github-markdown-css';
import 'highlight.js/styles/github.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'rc-tabs/assets/index.css';
import '../src/styles/index.less';

const req = require.context('../src/stories', true, /\.js$/);

setOptions({
    name: 'tabix.io',
    url: 'https://tabix.io/',
    showDownPanel: false
});

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
