import Connection from '../../Connection';

export default function connectGetErrorMessage(connection: Connection, type: string): string {
  const url = new URL(connection.connectionUrl);

  const proto = url.protocol.replace(/:$/g, '');

  return `
### Try resolve problem

1. Check URL, DNS 

2. Check username & password

3. Check clickhouse-server settings, if user in readonly mode   

Your input:
\`${proto}://${url.host}\`
  
#### Try check in browser 

1. Check host & port, open, must see OK:  \`${proto}://${url.host}\`

2. Check login & password, open, see version:\`${proto}://${url.host}?user=${connection.username}&password=${connection.password}&query=SELECT%20version()%20as%20version%20FORMAT%20JSON\`

3. Check can apply settings, open, see version:\`${proto}://${url.host}?add_http_cors_header=1&user=${connection.username}&password=${connection.password}&query=SELECT%20version()%20as%20version%20FORMAT%20JSON\`

4. Check can apply settings, open, see version:\`${proto}://${url.host}?max_result_rows=123&add_http_cors_header=1&user=${connection.username}&password=${connection.password}&query=SELECT%20version()%20as%20version%20FORMAT%20JSON\`

#### Result 

If 1 -> check host,dns...

if 2 -> check login/password 

if 3 -> need edit config clickhouse server , add add_http_cors_header

if 4 -> Tabix can not change \`max_result_rows\`, use readOnly mode. 

if all OK, this new Error( -> create issue )       
`;
}
