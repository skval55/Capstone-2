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

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const users = new User();

describe("create", function () {
  const newUser = { displayName: "testUser2", images: [{ url: "testUrl" }] };

  test("works", async function () {
    let user = await users.insertIntoUsers(newUser);
    console.log({ newUser });
    console.log(user);

    expect(user).toEqual({ newUser });

    const result = await db.query(
      `SELECT username, img_url FROM users WHERE username = 'testUser2';`
    );

    expect(result.rows).toEqual([
      { displayName: "testUser2", images: [{ url: "testUrl" }] },
    ]);
    //     const result = await db.query(
    //         `SELECT handle, name, description, num_employees, logo_url
    //          FROM companies
    //          WHERE handle = 'new'`);
    //   expect(result.rows).toEqual([
    //     {
    //       handle: "new",
    //       name: "New",
    //       description: "New Description",
    //       num_employees: 1,
    //       logo_url: "http://new.img",
    //     },
    //   ]);
  });
});
