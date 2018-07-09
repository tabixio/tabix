import Handsontable from 'handsontable';
/**
 * @plugin DropMenuPlugin
 *
 * @description
 * Every time you type "Hello" in a cell, DropMenuPlugins adds "World!" in the next cell.
 * Also, when you type "Handsontable", it adds "is awesome!" in the next cell.
 */
class DropMenuPlugin extends Handsontable.plugins.BasePlugin{
    constructor(hotInstance) {
        super(hotInstance);

        console.warn('DropMenuPlugin:start');
        /**
         * Array containing the vocabulary used in the plugin.
         *
         * @type {Array}
         */
        this.vocabularyArray = [];
    }

    /**
     * Check if the plugin is enabled in the settings.
     */
    isEnabled() {
        return !!this.hot.getSettings().dropMenu;
    }

    /**
     * Enable the plugin.
     */
    enablePlugin() {

        console.warn('DropMenuPlugin:enablePlugin');
        this.vocabularyArray = [
            ['Hello', 'World!'],
            ['Handsontable', 'is awesome!']
        ];

        this.addHook('afterChange', this.onAfterChange.bind(this));

        super.enablePlugin();
    }

    /**
     * Disable the plugin.
     */
    disablePlugin() {
        console.warn('DropMenuPlugin:disablePlugin');
        this.vocabularyArray = [];

        super.disablePlugin();
    }

    /**
     * Update the plugin.
     */
    updatePlugin() {
        console.warn('DropMenuPlugin:updatePlugin');
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
        console.warn('DropMenuPlugin:onAfterChange');
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
        console.warn('DropMenuPlugin:destroy');
        super.destroy();
    }
}
export {DropMenuPlugin};
