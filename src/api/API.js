import providerTabixServer from './provider/tabixserver.js';
import providerDirectClickHouse from './provider/directch.js';


export default class API {
    // const CURRENT_BASE_KEY = 'currentBaseConfig';
    // let _DatabaseStructure=new DatabaseStructure();
    // let database = null;
    // let connection = {};

    constructor(connection)
    {
        this._provider=new providerDirectClickHouse(connection);
    }

    provider()
    {
        return this._provider;
    }

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
    query(sql,withDatabase,format,extend_settings)
    {
        return this.provider().query(sql,withDatabase,format,extend_settings);
    }
    check()
    {
        let sql='SELECT \'login success\'';
        return this.query(sql);
    }
    render()
    {
        //
        // const actualVersion = await axios.get('https://drxri7dj6k.execute-api.us-east-1.amazonaws.com/prd');

        this.query('SELECT 1 as ping').then(result=> console.log(result)

        );
        return ;
        // let s=await
        // console.info("Z",z);
        // return "OK!";
    }
}