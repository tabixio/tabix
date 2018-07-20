import {map,maxBy,isEmpty,is} from 'ramda';

export default class DataDecorator {
    /**
     *
     * @param result
     * @param sourceType
     */
    constructor(result, sourceType) {

        if (result.totals && result.data)
        {
            result.data.push(result.totals);
        }
        this._humanSortCols=[];
        this._sortBy=false;
        this._sortOrder=false;
        this.data = result.data;
        this.text = false;
        this.progressQuery = '';
        this.sort = false;
        this.sortOrder = false;
        // Если результат строка
        if (!result.error && !is(Object,result.data)) {
            if (is(String,result.data)) {
                this.text = JSON.stringify(result.data);
            }
            else {
                this.text = result.data;
            }
            // XSS
            this.text=this.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        // --------------------------------------------------
        if (!sourceType) sourceType='ch';
        this.sourceType = sourceType;

        this.meta = result.meta;
        this.prepareInt64Cols={};

        // prepare (Int64+UInt64)
        if (this.data)
        {
            try {
                this.prepareInt64();
            } catch (e)
            {
                console.error('Error in prepareInt64',e);
            }

            if (is(Object,this.meta))
            {
                this.meta.prepareInt64Cols=this.prepareInt64Cols;
            }

        }

        if (result.query) {
            this.query = result.query;
        }
        else {
            this.query = {index:0,drawCommands:false}
        }
        if (result.error) {
            // XSS
            this.error = result.error.replace('<br/>',"\n").replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            this.error = this.error.replace('\\'+'n','<br/>');

        }
        else {
            this.error = false;
        }
        this.draw = this.query.drawCommands;
        this.rows = result.rows;

        this.position = this.query.index;       // порядковый номер
        this.countAll = result.countAllQuery;   // всего запросов в выполнении

    }
    prepareInt64()
    {
        let $canConvert=[];

        if (!(Array.isArray(this.data) && this.data.length>1)) return false;

        this.prepareInt64Cols={};
        this.meta.forEach((cell) => {
            if (cell.type.includes('Int64') && !cell.type.includes('Array(') ) {
                //  max value

                let $v=0;
                try {
                    let comparator=o=> {
                        if (!isEmpty(o[cell.name]))  return parseInt(o[cell.name]);
                    };
                    $v=maxBy(comparator,this.data)[cell.name];

                } catch (e)
                {
                    console.error("prepareInt64,maxBy",e,'in cell',cell,'meta',this.meta);
                }


                let $max=parseInt($v);

                // 11117311154531369000

                if ($max<Number.MAX_SAFE_INTEGER) {
                    $canConvert.push(cell.name);
                    this.prepareInt64Cols[cell.name]=true;
                }
            }
        });

        if (!($canConvert.length>0)) return false;

        // console.log("$canConvert, convert to Int",$canConvert);

        this.data=map(function (o) {
            $canConvert.forEach((cell)=>{
                o[cell]=parseInt(o[cell]);
            });
            return o;
        },this.data);

    }
    isNormalInt64Col(coll)
    {
        return this.prepareInt64Cols[coll];
    }
    /**
     * Преобразование массива в обьект для конструктора  DataProvider
     *
     * @param data
     * @returns {DataDecorator}
     */
    static convertArrayToDataProvider(data, sourceType) {

        let result = {};
        result.data = data;
        result.meta = [];
        result.error = false;
        result.query = {drawCommands: false};
        result.rows = data.length;
        result.position = 0;
        result.countAll = 0;
        Object.keys(data[0]).map(key => (
            result.meta.push({name: key, type: 'string'})
        ));
        return new DataDecorator(result, sourceType);


    }

    isText() {
        if (this.text) {
            return true;
        }
        return false;
    }

    isError() {
        if (this.error) {
            return true;
        }
        return false;
    }

    getError() {
        return this.error;
    }
    update(data)
    {
        this.data=data;
    }

    getData() {
        return this.data;
    }

    getMeta() {
        return this.meta;
    }

    toString() {
        return JSON.stringify(this.data);
    }
    getColumnsHumanSort()
    {
        return this._humanSortCols;
    }
    setColumnsHumanSort($cols)
    {
        this._humanSortCols=$cols;
    }
    setSort($coll,$order)
    {
        // column : Number - this index of column, by which you want to sorter the table.
        // sortOrder : Boolean - defines the order of sorting (true for ascending, false for descending).
        this._sortBy=$coll;
        this._sortOrder=$order;
        if (is(Number,$order))
        {
            this._sortOrder=(parseInt($order)<0?false:true);
        }
    }
    getSortByColl() {
        return this._sortBy;
    }
    getSortOrderBy() {
        return this._sortOrder;
    }

}