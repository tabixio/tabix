import Handsontable from 'handsontable';
/**
 * @plugin DropMenuPlugin
 *
 */
const MENU_BUTTON_CLASS_NAME = 'DropMenuButton';

class DropMenuPlugin extends Handsontable.plugins.BasePlugin{
    constructor(hotInstance) {
        super(hotInstance);
        this.eventManager = new Handsontable.EventManager(this);
        this.hot.addHook('afterGetColHeader', (col, TH) => this.onAfterGetColHeader(col, TH));
    }

    /**
     * Check if the plugin is enabled in the settings.
     */
    isEnabled() {
        return this.hot.getSettings().dropMenu && !!this.hot.getSettings().dropMenuEnable;
    }
    registerEvents() {
        this.eventManager.addEventListener(this.hot.rootElement, 'click', (event) => this.onToggleMenuClick(event));
    }
    /**
     * Enable the plugin.
     */
    enablePlugin() {
        this.registerEvents();
        this.menu = this.hot.getSettings().dropMenu;
        this.addHook('afterChange', this.onAfterChange.bind(this));
        super.enablePlugin();
    }

    onToggleMenuClick(event) {

        if (typeof event.stopPropagation === 'function') {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }

        if (Handsontable.dom.hasClass(event.target, MENU_BUTTON_CLASS_NAME) ) {
            let rect = event.target.getBoundingClientRect();
            this.menu(this,event,rect);

        }
    }

    /**
     * `onAfterGetColHeader` callback. Adds column menu css classes to clickable button.
     *
     * @param col
     * @param TH
     */
    onAfterGetColHeader(col, TH) {
        //
        if (col < 0 || !TH.parentNode) {
            return false;
        }

        let headerRow = TH.parentNode;
        let headerRowList = headerRow.parentNode.childNodes;

        let level = Array.prototype.indexOf.call(headerRowList, headerRow);

        if (col < 0 || level !== headerRowList.length - 1) {
            return;
        }

        const isExist = TH.querySelector('.' + MENU_BUTTON_CLASS_NAME);
        if (this.enabled && isExist) {
            return;
        }
        if (!this.enabled) {
            if (isExist) {
                isExist.parentNode.removeChild(isExist);
            }

            return;
        }
        let button = document.createElement('button');

        button.className = MENU_BUTTON_CLASS_NAME;
        button.onclick = function() {
            return false;
        };
        TH.firstChild.insertBefore(button, TH.firstChild.firstChild);

    }
    /**
     * Disable the plugin.
     */
    disablePlugin() {
        super.disablePlugin();
    }

    /**
     * Update the plugin.
     */
    updatePlugin() {
        this.disablePlugin();
        this.enablePlugin();
        super.updatePlugin();
    }

    /**
     * The afterChange hook callback.
     *
     * @param {Array} changes Array of changes.
     * @param {String} source Describes the source of the change.
     */
    onAfterChange(changes, source) {
        // Check wheter the changes weren't blank or the hook wasn't triggered inside this callback.
        if (!changes || source === 'DropMenuPlugin') {
            return;
        }
        let arrayEach = Handsontable.helper.arrayEach;
        arrayEach(changes, function(change, i) {
            arrayEach(this.vocabularyArray, function(entry, j) {

                if (change[3] && change[3].toString().toLowerCase() === entry[0].toString().toLowerCase()) {
                    this.hot.setDataAtCell(change[0], change[1] + 1, entry[1], 'DropMenuPlugin');
                }

            });
        });
    }

    /**
     * Destroy the plugin.
     */
    destroy() {
        super.destroy();
    }
}
export {DropMenuPlugin};
