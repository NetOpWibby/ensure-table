


//  I M P O R T

import { r } from "rethinkdb-ts";

//  U T I L

interface DatabaseInput {
  name: string;
  index?: string | string[];
  options?: {
    // https://rethinkdb.com/api/javascript/connect
    // https://github.com/rethinkdb/rethinkdb-ts/blob/master/test/config.ts
    buffer?: number;
    db?: string;
    discovery?: boolean;
    host?: string;
    max?: number;
    password?: string;
    port?: number;
    silent?: boolean;
    timeout?: number;
    user?: string;
  };
};



//  E X P O R T

export default async(database: DatabaseInput) => {
  let { index, name, options } = database;

  options = {
    buffer: 2,
    db: name,
    discovery: false,
    host: "localhost",
    max: 5,
    password: "",
    port: 28015,
    silent: true,
    user: "admin",
    // User overrides
    ...options
  };

  const databaseConnection = await r.connect(options);

  try {
    await ensureCheck();
    console.log(`✨ Table "${name}", ready`);
  } catch(tableConnectionError) {
    await r.tableCreate(name).run(databaseConnection);
    await ensureCheck();
    console.log(`⚡️ Created "${name}" table`);
  }

  finally {
    databaseConnection.close();
  }

  async function ensureCheck() {
    if (index && Array.isArray(index)) {
      const indexPromises: Array<Promise<any>> = [];

      index.map(indexItem => indexPromises.push(r.table(name).indexWait(indexItem)
        .run(databaseConnection)));
      await Promise.all(indexPromises);
    } else if (index) {
      await r.table(name).indexWait(String(index))
        .run(databaseConnection);
    } else {
      await r.table(name).run(databaseConnection);
    }
  }
};
