import {HandsTableContextMenu} from './HandsTableContextMenu.js';
import Handsontable from 'handsontable';
import {indexOf,isNil,is} from 'ramda';

export class SettingsMapper {
    constructor() {
        this.registeredHooks = Handsontable.hooks.getRegistered();
    }

    /**
   * Parse component settings into Handosntable-compatible settings.
   *
   * @param {Object} properties Object containing properties from the HotTable object.
   * @returns {Object} Handsontable-compatible settings object.
   */
    getSettings(properties) {
        let newSettings = {};

        if(properties.settings) {
            let settings = properties.settings;
            for (const key in settings) {
                if (settings.hasOwnProperty(key)) {
                    newSettings[this.trimHookPrefix(key)] = settings[key];
                }
            }
        }

        if (properties.data && properties.data.constructor.name === 'DataDecorator') {

            console.log('------------------- asdasdasdads --------------');
            newSettings=this.makeSettings(properties);

        } else {

            for (const key in properties) {
                if (key !== 'settings' && properties.hasOwnProperty(key)) {
                    newSettings[this.trimHookPrefix(key)] = properties[key];
                }
            }
        }

        return newSettings;
    }

    /**
   * Trim the "on" hook prefix.
   *
   * @param {String} prop Settings property.
   * @returns {String} Handsontable-compatible, prefix-less property name.
   */
    trimHookPrefix(prop) {
        if (prop.indexOf('on') === 0) {
            let hookName = prop.charAt(2).toLowerCase() + prop.slice(3, prop.length);
            if (this.registeredHooks.indexOf(hookName) > -1) {
                return hookName;
            }
        }

        // returns the string anyway, when we're sure all the hooks are registered, might be changed
        return prop;
    }
    _handsRenderer(instance, td, row, col, prop, value, cellProperties) {

        // if (cellProperties.type)
        if (cellProperties.type == 'numeric') {
            if (value==null || value=='-nan' || value=='inf' || value=='+nan' || value=='+inf'|| value=='-inf' || value=='nan') {
                // SELECT  inf, nan
                if (value==null)
                {
                    arguments[5] = "NULL";// так работает ;)
                }
                td.style.color='black';
                td.style.background='red';
                Handsontable.renderers.TextRenderer.apply(this, arguments);
            }

            else {


                // нормальный рендер числа
                Handsontable.renderers.NumericRenderer.apply(this, arguments);
            }


        }
        else {
            if (cellProperties.type == 'date' || cellProperties.type == 'time') {
                // кастомный рендер на поле даты/вреря/датавремя
                if (moment(new Date(value)).isValid()) {
                    if (cellProperties.renderDateFormat) {
                        value = moment(value).format(cellProperties.renderDateFormat);
                    }
                }

                arguments[5] = value;// так работает ;)


                Handsontable.renderers.TextRenderer.apply(this, arguments);
            }
            else {

                Handsontable.renderers.TextRenderer.apply(this, arguments);
            }
        }

        // backgroundColor для ячейки
        if (cellProperties.backgroundColor) {
            td.style.backgroundColor = cellProperties.backgroundColor;
        }

        if (cellProperties.color) {
            td.style.color = cellProperties.color;
        }
    };

    makeColumns(data,isDarkTheme)
    {
        const humanSortCols=false;//this.Preset.humanSortCols;
        let colHeaders = [];
        let columns = [];
        let positions = {};
        let cnt = 0;
        data.getMeta().forEach((cell) => {


            positions[cell.name] = cnt;
            cnt++;

            colHeaders.push(cell.name);
            let c = {};
            c.type = 'text';
            c.width = 100;
            c.typeOriginal = cell.type;
            c.isDark = isDarkTheme;

            //UInt8, UInt16, UInt32, UInt64, Int8, Int16, Int32, Int64
            if (cell.type.includes('Int64')) {
                // Default string type
                c.type = 'text';
                c.width = 100;
                // if DataProvider.prepareInt64() convert String->Int64, use numeric type
                if (is(Object,data.getMeta().prepareInt64Cols)) {
                    if (data.getMeta().prepareInt64Cols[cell.name])
                        c.type='numeric';
                }

            } else  if (cell.type.includes('Int')) {
                c.width = 80;
                c.type = 'numeric';
            }
            // other type
            switch (cell.type) {
                case 'Date':
                    c.width = 90;
                    c.type = 'date';
                    c.dateFormat = 'YYYY-MM-DD';
                    break;
                case 'DateTime':
                    c.width = 150;
                    c.type = 'time';
                    c.timeFormat = 'YYYY-MM-DD HH:mm:ss';
                    break;
                case 'Float32':
                    c.width = 80;
                    c.type = 'numeric';
                    c.format = "0.[0000000]";
                    break;
                case 'Float64':
                    c.width = 80;
                    c.type = 'numeric';
                    c.format = "0.[0000000]";
                    break;
                case 'String':
                    c.width = 180;
                    break;
            }
            c.renderer = this._handsRenderer;
            c.data = cell.name;



            if (is(Array,humanSortCols) && indexOf(cell.name,humanSortCols)>-1)
            {
                c.sortFunction=function (sortOrder) {
                    // Handsontable's object iteration helper
                    let objectEach = Handsontable.helper.objectEach;
                    let unitsRatios = {
                        'TiB': 1024*1024*1024*1024,
                        'GiB': 1024*1024*1024,
                        'MiB': 1024*1024,
                        'KiB': 1024,
                        'B': 1,
                    };
                    let parseUnit = function(value, unit, ratio) {
                        if (isNil(value)) return value;
                        if (isNaN(value) && value.indexOf(' ' + unit) > -1) {
                            value = parseFloat(value.replace(unit, '')) * ratio;
                        }
                        return value;
                    };



                    return function(a, b) {
                        let newA = a[1];
                        let newB = b[1];
                        // console.log(">",a,b);
                        objectEach(unitsRatios, function(val, prop) {
                            newA = parseUnit(newA, prop, val);
                            newB = parseUnit(newB, prop, val);
                        });

                        if (newA < newB) {
                            return sortOrder ? -1 : 1;
                        }
                        if (newA > newB) {
                            return sortOrder ? 1 : -1;
                        }
                        return 0;
                    };

                }
            }

            columns.push(c);
        });

        return {
            colHeaders: colHeaders,
            columns: columns,
            colPositions: positions
        };
    }
    makeSettings(properties)
    {
        const isDarkTheme=properties.dark;
        let {columns,colHeaders} = this.makeColumns(properties.data,isDarkTheme);
        let o = {
            observeChanges:false, // WARN! Memory leak
            observeDOMVisibility: true,
            manualColumnMove: true,
            manualColumnResize: true,
            rowHeaders: true,
            colWidths: 100,
            fillHandle: false,
            stretchH: 'all',
            isDark:isDarkTheme,
            customBorders: true,
            filters: true,
            currentRowClassName: (isDarkTheme?'currentRowDark':'currentRowWhite'),
            currentColClassName: 'currentCol',
            columnSorting: true,
            sortIndicator: true,
            manualRowResize: true,
            viewportColumnRenderingOffset:'auto',
            wordWrap: false,
            autoColumnSize: {samplingRatio: 23},
            columns: columns,
            colHeaders: colHeaders,
            dropMenu: true,//
            // preventOverflow: 'horizontal',
            // visibleRows:120,
            // width:'100%',
            // height:'100%',
            // fixedRowsTop: 1,
            // fixedColumnsLeft: 1,
            // maxRows: 1000,
            renderAllRows:false,
            visibleRows:1500
        };
        // Make ContextMenu
        let z=new HandsTableContextMenu();
        o.contextMenu=z.fecthContextMenu();


        // Preset
        // if (this.Preset.sort) {
        //     o.columnSorting = {
        //         column: makeColumns.colPositions[this.Preset.sort]
        //     };
        //     o.columnSorting.sortOrder=this.Preset.sortOrder;
        // }
        o.data=properties.data.getData();
        return o;
    }

}
