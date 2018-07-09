import providerTabixServer from './provider/tabixserver.js';
import providerDirectClickHouse from './provider/directch.js';
import DataDecorator from './DataDecorator.js';



export default class API {
    // const CURRENT_BASE_KEY = 'currentBaseConfig';
    // let _DatabaseStructure=new DatabaseStructure();
    // let database = null;
    // let connection = {};

    constructor(connection)
    {
        this._provider=new providerDirectClickHouse(connection);
        this._initDs=false;
        this._version=null;

    }

    /**
     * @returns {providerDirectClickHouse|DirectClickHouse}
     */
    provider()
    {
        return this._provider;
    }
    getDatabase()   {return this.provider().getDatabase();}
    getLogin()      {return this.provider().getLogin();}
    getPassword()   {return this.provider().getPassword();}
    getHost()       {return this.provider().getHost();}

    useDatabase(db)
    {
        this.provider().setDatabase(db);
    }
    isAuthorized()
    {
        return true;
    }
    isTabixServer()
    {
        // if (!connection.tabix) return false;
        // if (connection.tabix.server) return true;
        return false;
    }

    /**
     * @param sql
     * @param withDatabase
     * @param format
     * @param extend_settings
     * @returns {Promise<*>}
     */
    async query(sql,withDatabase,format,extend_settings)
    {
        return this.provider().query(sql,withDatabase,format,extend_settings);
    }

    /**
     * @param sql
     * @param withDatabase
     * @param format
     * @param extend_settings
     * @returns {Promise<DataDecorator>}
     */
    async fetch(sql,withDatabase,format,extend_settings)
    {
        let data=await this.query(sql,withDatabase,format,extend_settings);
        return new DataDecorator(data,this.provider().getType());
    }
    async loadDatabaseStructure()
    {
        return this.provider().loadDatabaseStructure();
    }
    async init()
    {
        let ver = await this.query('SELECT version() as ver');
        if (ver.data && ver.data[0] && ver.data[0]['ver'])
        {
            this._version=ver.data[0]['ver'];
        }
        console.log('ClickHouse version',this._version);
        if (!this._initDs)
        {
            this._initDs=await this.loadDatabaseStructure();
        }
        return this._initDs;
    }

    /**
     * @returns {DatabaseStructure}
     */
    getDatabaseStructure()
    {
        return this.provider().databaseStructure();
    }
    async check()
    {
        let sql='SELECT \'login success\'';
        let s=await this.query(sql);
        console.log('ss',s);
        return s;
    }
    async test()
    {
        //// @todo for send_progress_in_http_headers try https://github.com/sockjs/sockjs-client
        //

        //
        // let isInit =await this.loadDatabaseStructure();
        // console.log('dsInit',isInit);


        let data = await this.fetch('select number,sin(number) as sin,cos(number) as cos FROM system.numbers LIMIT 100');

        return data;
    }
}