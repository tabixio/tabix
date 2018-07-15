/**
 * Get from state authorized connection
 */
export default state => state.login.connections.find(x => x.authorized);