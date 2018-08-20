import CoreProvider from './CoreProvider';

export default class TabixServerProvider extends CoreProvider {
  //     pushProjectState = (body) => {
  //     return fetchTabixServer('projectstate/push',body);
  // };
  //
  //     getProjectState = (body) => {
  //     return fetchTabixServer('projectstate/fetch',body);
  // };
  //     getStructure= (body) => {
  //     return fetchTabixServer('structure',body);
  // };
  //
  //     getWidget= (wId,body) => {
  //     return fetchTabixServer('widget/'+wId,body);
  // };
  //     getDashboard= (dashId,body) => {
  //     return fetchTabixServer('dashboard/'+dashId,body);
  // };
  //     getDashboardsTree = (body) => {
  //     return fetchTabixServer('dashboards',body);
  // };
  fetchQuery(sql, withDatabase, format, extend_settings) {
    return this.fetchTabixServer(
      'query',
      {
        query: this.makeSqlQuery(sql, format),
      },
      extend_settings
    );
  }

  fetchTabixServer(action, body, extend_settings) {
    // if (!_.isObject(body)) body={};
    //
    // let url = connection.tabix.server;
    // url = url + '/'+action+'?tabix_client='+window.TabixVersion+'&random='+Math.round(Math.random() * 100000000);
    // if (extend_settings) {
    //     url += '&' + extend_settings;
    // }
    //
    // let request = {
    //     version:window.TabixVersion,
    //     auth: {
    //         login: connection.tabix.login,
    //         password: connection.tabix.password,
    //         confid:connection.tabix.confid
    //     }
    // };
    //
    // request = Object.assign(body,request);
    //
    // let init={
    //     mode: 'cors',
    //     method: 'post',
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8'
    //     },
    //     body : (JSON.stringify(request))
    // };
    //
    // console.info('TS Request',url,init);
    //
    // let myRequest = new Request(url, init);
    //
    //
    //
    // return fetch(myRequest)
    //     .then(function(response) {
    //         let contentType = response.headers.get('content-type');
    //         if (contentType.includes('text/plain') && response.status == 200 &&  response.statusText.toLowerCase() == 'ok' )
    //         {
    //             // create table && drop table
    //             return 'OK';
    //
    //         }
    //         if (contentType && contentType.includes('application/json') && response.status >= 200 && response.status < 300) {
    //             return Promise.resolve(response)
    //         } else {
    //             return response.text().then(Promise.reject.bind(Promise));
    //         }
    //     })
    //     .then(function(response) {
    //             if (response==='OK') {
    //                 return 'OK';
    //             }
    //             return response.json();
    //         },
    //         function (responseBody) {
    //             return Promise.reject(responseBody);
    //         }
    //     );
  }
}
