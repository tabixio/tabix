import Connection from '../../Connection';

export default function connectGetErrorMessage(connection: Connection, type: string): string {
  const host = new URL(connection.connectionUrl).host;
  const protocol = new URL(connection.connectionUrl).protocol;
  const port = new URL(connection.connectionUrl).port;

  return `
### Try resolve problem

1. Check URL, DNS 

2. Check username & password

3. Check clickhouse-server settings if user in readonly mode   
  
host : \`${host}\`  
protocol : \`${protocol}\`  
port : \`${port}\`
  
\`\`\`CURL  \`\`\`
  
  ghi`;
}
