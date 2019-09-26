// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require('firebase');
const firebaseConfig = require('./db_config');
const User = require('./models/User');
const objectHash = require('object-hash');
require('firebase-admin');

class Database {

  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.firestore();
  }

  createUser(user) {
    return new User(user.query.email, user.query.password);
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
    const snapshots = await this.database.collection('Users').get();

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
  async insertUser(user) {
    const tempUser = this.getTempUser(user);
    const insertedRef = await this.database.collection('Users').add(tempUser);
    const inserted = await insertedRef.get();
    return {
      id: insertedRef.id,
      data: inserted.data()
    };
  }

  async deleteUser(id) {
    const deleted = await this.database.collection('Users').doc(id).delete();
    return id;
  }
}
module.exports = Database;