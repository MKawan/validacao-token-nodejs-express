import {Pool} from 'pg';

const connectionString = 'postgres://djelooym:w6DRHeWwQ_xefqfSg7ZnEjO4k_7kgaXa@tuffi.db.elephantsql.com/djelooym';
const db = new Pool({connectionString});

export default db;