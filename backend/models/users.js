const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class User {
  async checkIfUserExists(username) {
    try {
      const res = await db.query(
        `SELECT id
     FROM users
     WHERE username = $1`,
        [username]
      );
      const userExists = res.rows[0] ? true : false;
      return userExists;
    } catch (error) {}
  }

  async insertIntoUsers(user) {
    // console.log("user", user);
    const duplicateCheck = await db.query(
      `SELECT username
       FROM users
       WHERE username = $1`,
      [user.display_name]
    );
    // if (duplicateCheck.rows[0]) return user.display_name;
    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate user ${user.display_name}`);

    const img_url =
      user.images.length > 0
        ? user.images[0].url
        : "https://i.scdn.co/image/ab6761610000e5eb601fb0059594d52f3f7939a9";
    try {
      const result = await db.query(
        `INSERT INTO users (username, img_url) VALUES ($1, $2) RETURNING username;
    `,
        [user.display_name, img_url]
      );
      // console.log(result);
      return user.display_name;
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }

  async deleteUser(username) {
    const result = await db.query(
      `DELETE FROM users
        WHERE username = $1 RETURNING username
        `,
      [username]
    );
    const user = result.rows[0];
    if (!user) throw new NotFoundError(`No user: ${username}`);
    return "success!";
  }
}

module.exports = { User };
