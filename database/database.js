// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require('firebase');
const firebaseConfig = require('./db_config');
const User = require('./models/User');
const objectHash = require('object-hash');
require('firebase-admin');

class Database {

  constructor() {
    firebase.initializeApp(firebaseConfig.firebaseConfig);
    this.database = firebase.firestore();
    this.collectionPath = firebaseConfig.collectionPath;
  }

  /**
   * Creates a new object from a Req object
   * @param {Request} req Request object. 
   */
  createUser(req) {
    const {
      query,
      params,
      body
    } = req;
    let user;
    if (query) {
      user = new User(query.email, objectHash.sha1(query.password));
    } else if (params) {
      user = new User(params.email, objectHash.sha1(params.password));
    } else if (body) {
      user = new User(body.email, objectHash.sha1(body.password));
    } else {
      user = null;
    }
    return user;
  }

  getTempUser(user) {
    return {
      email: user.getEmail(),
      password: user.getPassword()
    };
  }

  /**
   * Get all users from database!
   * @returns {object[]} All users in tbe database
   */
  async getUsers() {
    const snapshots = await this.database.collection(this.collectionPath).get();

    const documents = snapshots.docs.map((doc) => {
      const {
        email,
        password
      } = doc.data();
      return {
        email,
        password
      };
    });

    return documents;
  }

  /**
   * Inserts a user into firestore, takes a User object.
   * @param {User} user 
   */
  async insertUser(req) {
    const user = this.createUser(req);
    const insertedRef = await this.database.collection(this.collectionPath).add(user);
    const inserted = await insertedRef.get();
    return {
      id: insertedRef.id,
      message: `Successfully inserted ${id} into Firebase.`
    };
  }

  async deleteUser(id) {
    const deleted = await this.database.collection(this.collectionPath).doc(id).delete();
    return id;
  }
}
module.exports = Database;