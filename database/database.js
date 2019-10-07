// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
(function () {
  const firebase = require('firebase');
  const config = require('./db_config');
  const User = require('./models/User');
  const bcrypt = require('bcrypt');
  const _ = require('lodash');
  const jwt = require('jsonwebtoken');
  require('firebase-admin');

  class Database {

    constructor() {
      if (!firebase.apps.length) {
        firebase.initializeApp(config.firebaseConfig);
      }
      this.database = firebase.firestore();
      this.collectionPath = config.collectionPath;
      this.collectionSize = 400;
    }

    /**
     * Creates a new object from a Req object
     * @param {Request} req Request object. 
     */
    createUser(email, password, date) {

      return new User(email, password, date || Date.now());
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
      this.collectionSize = documents.length;
      return documents;
    }

    async getUserById(id) {

    }

    async getUsersWithLimit(limit) {
      const snapshots = await this.getUsers();
      const docs = _.takeRight(snapshots, limit);
      return docs;
    }

    /**
     * Inserts a user into firestore, takes email, password.
     */
    async insertUser(email, password) {
      const saltRounds = 10;

      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) reject(err)
          resolve(hash)
        });
      });
      // Add user
      const user = this.createUser(email, hashedPassword);
      const userToInsert = JSON.parse(JSON.stringify(user));
      const ref = this.database.collection(this.collectionPath);
      const added = await ref.add(userToInsert);

      // register webToken
      const token = jwt.sign({
        id: added.id
      }, config.privateKey, {
        expiresIn: 3600
      });
      return {
        id: added.id,
        auth: true,
        token
      };
    }

    async deleteUser(id) {
      const deleted = await this.database.collection(this.collectionPath).doc(id).delete();
      return id;
    }

    getPrivateKey() {
      return config.privateKey;
    }
  }
  module.exports = Database;
})();