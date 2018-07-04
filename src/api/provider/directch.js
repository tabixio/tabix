import CoreProvider from './core';

export default class DirectClickHouse extends CoreProvider
{
    makeUrlRequest(withDatabase,extend_settings)
    {
        let url = '';
        let connection=this.getConnection();
        let httpProto = '';
        if (!(connection.host.indexOf('://') > 0 || connection.host.indexOf('/') == 0)) {
            httpProto = 'http://';
        }
        // ClickHouse/dbms/src/Interpreters/Settings.h : https://github.com/yandex/ClickHouse/blob/master/dbms/src/Interpreters/Settings.h
        url = httpProto + connection.host ;
        url = url + '/?';
        url = url + 'add_http_cors_header=1&log_queries=1&output_format_json_quote_64bit_integers=1&output_format_json_quote_denormals=1';
        // max_block_size=1&send_progress_in_http_headers=1&http_headers_progress_interval_ms=500
        // ------------

        if (connection.password)
        {
            url += '&user='+encodeURIComponent(connection.login)+'&password='+encodeURIComponent(connection.password);
        }
        else
        {
            url += '&user='+encodeURIComponent(connection.login);
        }

        if (withDatabase) {
            url += '&database=' + encodeURIComponent(this.getDatabase());
        }
        if (extend_settings) {
            url += '&' + extend_settings;
        }

        if (connection.params){
            url += '&'+connection.params;
        }
        return url;

    }
    query(sql,withDatabase,format,extend_settings)
    {
        let query=this.makeSqlQuery(sql,format);
        let url=this.makeUrlRequest(withDatabase,extend_settings);
        let myInit={
            mode: 'cors',
            method: 'post',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body : query
        };
        // if (connection.includeCredentials)
        // {
        //     myInit.credentials='include'; // Error : The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
        // }
        let myRequest = new Request(url, myInit);
        return this.request(myRequest);
    }
}