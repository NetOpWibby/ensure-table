


///  N A T I V E

import assert from "assert";

///  I M P O R T

import { r } from "rethinkdb-ts";
import Test from "@webb/test";

///  U T I L

import defaultExport, { ensureTable } from "../dist";



///  T E S T

const test = Test("@webb/ensure-table");

test("Fails when 'name' is not defined", async() => {
  await assert.rejects(async() => {
    // @ts-ignore | TS2322 | TypeScript is so good we have to ignore this error for the test to process
    await defaultExport({ name });
  }, {
    message: "name is not defined",
    name: "ReferenceError"
  });
});

test("Fails to connect to database", async() => {
  await assert.rejects(async() => {
    await defaultExport({ name: "test_db" });
  }, {
    message: "connect ECONNREFUSED ::1:28015",
    name: "Error"
  });
});

test("Fails when 'name' is not defined, using named export", async() => {
  await assert.rejects(async() => {
    // @ts-ignore | TS2322 | TypeScript is so good we have to ignore this error for the test to process
    await ensureTable({ name });
  }, {
    message: "name is not defined",
    name: "ReferenceError"
  });
});

test("Fails to connect to database, using named export", async() => {
  await assert.rejects(async() => {
    await ensureTable({ name: "test_db" });
  }, {
    message: "connect ECONNREFUSED ::1:28015",
    name: "Error"
  });
});

// TODO
// - write tests that connect to a sample database

test.run();
