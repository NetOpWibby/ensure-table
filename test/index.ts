


//  N A T I V E

import assert from "assert";

//  I M P O R T S

import { r } from "rethinkdb-ts";
import Test from "@webb/test";

//  U T I L

import ensureTable from "../dist";



//  T E S T S

const test = Test("@webb/ensure-table");

test("Fails when 'name' is not defined", async() => {
  await assert.rejects(async() => {
    await ensureTable({ name });
  }, {
    message: "name is not defined",
    name: "ReferenceError"
  });
});

test("Fails to connect to database", async() => {
  await assert.rejects(async() => {
    await ensureTable({ name: "test_db" });
  }, {
    message: "connect ECONNREFUSED 127.0.0.1:28015",
    name: "Error"
  });
});

// TODO
// - Write tests that actually connect to a sample database

test.run();
