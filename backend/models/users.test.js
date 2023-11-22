"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { User } = require("./users");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

const users = new User();

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newUser = { display_name: "testUser2", images: [{ url: "testUrl" }] };

  test("works", async function () {
    await users.insertIntoUsers(newUser);

    const result = await db.query(
      `SELECT username, img_url FROM users WHERE username = 'testUser2';`
    );

    console.log(result);
    console.log("result");

    expect(result.rows[0]).toEqual({
      img_url: "testUrl",
      username: "testUser2",
    });
  });
  test("bad request with dupe", async function () {
    try {
      await users.insertIntoUsers(newUser);
      await users.insertIntoUsers(newUser);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** delete */

describe("delete", function () {
  test("works", async function () {
    const result1 = await db.query(
      `SELECT username FROM users WHERE username = 'testUser1';`
    );
    expect(result1.rows.length).toEqual(1);

    await users.deleteUser("testUser1");

    const result = await db.query(
      `SELECT username FROM users WHERE username = 'testUser1';`
    );
    expect(result.rows.length).toEqual(0);
  });
  test("not found if no such user", async function () {
    try {
      await users.deleteUser("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

// describe("remove", function () {
//   test("works", async function () {
//     await Company.remove("c1");
//     const res = await db.query(
//       "SELECT handle FROM companies WHERE handle='c1'"
//     );
//     expect(res.rows.length).toEqual(0);
//   });

//   test("not found if no such company", async function () {
//     try {
//       await Company.remove("nope");
//       fail();
//     } catch (err) {
//       expect(err instanceof NotFoundError).toBeTruthy();
//     }
//   });
// });
