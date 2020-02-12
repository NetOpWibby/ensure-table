# @webb/ensure-table

> Ensure your desired RethinkDB table exists.
> If not, it gets created.



## Install

```sh
# Install this module, with RethinkDB driver
$ npm i @webb/ensure-table rethinkdb-ts
```



## Usage

```js
import ensureTable from "@webb/ensure-table";
import server from "some-module";

const databaseOptions = {
  buffer: 2,
  db: "my-cool-product",
  discovery: false,
  host: "localhost",
  max: 5,
  password: "need-a-vc-to-sell-my-company-to-faang",
  port: 90210,
  silent: true,
  user: "admin"
};

server.listen(3000, async() => {
  try {
    // Ensure table with no additional indexes exist
    await ensureTable({ name: "passes", options: databaseOptions });

    // Ensure table with a single index exists
    await ensureTable({ name: "tokens", index: "token", options: databaseOptions });

    // Ensure table with several indexes exist
    await ensureTable({ name: "users", index: ["email", "login"], options: databaseOptions });
  } catch(databaseError) {
    console.error(databaseError);
  }

  console.info("Server is running at port 3000");
});
```



## API

### ensureTable({ name, index?, options? })
#### name

Type: `string` (required)

#### index

Type: `string` | `[string]` (optional)

#### options

Type: `object` (optional)

Available options:

```json
// All values are defaults, aside from "db".
// Internally, "db" will be the same value as "name" if not declared.
{
  buffer: 2,
  db: name,
  discovery: false,
  host: "localhost",
  max: 5,
  password: "",
  port: 28015,
  silent: true,
  user: "admin"
}
```



## Tests

```sh
# Run all tests, sequentially
$ npm test

# Test dependencies for latest versions
$ npm run test:dependencies

# Lint "src" directory
$ npm run test:typescript

# Test this module
$ npm run test:assert
```
