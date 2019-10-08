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
    }

    /**
     * Creates a new object from a Req object
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
     * @returns {User[]} All users in tbe database
     */
    async getUsers() {
      const snapshot = await this.database.collection(this.collectionPath).get();
      const users = snapshot.docs.map(doc => {
        const {
          _email,
          _password,
          _insertedDate
        } = doc.data();

        const _insertedAt = new Date(_insertedDate).toLocaleString();

        return {
          _email,
          _password,
          _insertedAt,
          _readAt: new Date(Date.now()).toLocaleString()
        };
      });
      return users;
    }

    async getUserById(id) {
      const ref = this.database.collection(this.collectionPath).doc(id);
      const user = await ref.get();
      return user.data();
    }

    async getUsersWithLimit(limit) {
      const snapshots = await this.getUsers();
      const docs = _.takeRight(snapshots, limit);
      return docs;
    }

    async getUser(email, password) {

      const users = await this.getUsers();

      for (let user of users) {
        const hashedPassword = await bcrypt.compare(password, user._password);
        if (user._email === email && hashedPassword) {
          return user;
        }
      }

      return null;
    }

    /**
     * Inserts a user into firestore, takes email, password.
     */
    async insertUser(email, password) {

      const hashedPassword = await this.hashPassword(password);
      // Add user
      const user = this.createUser(email, hashedPassword);
      const ref = this.database.collection(this.collectionPath);
      const added = await ref.add({
        ...user
      });

      return added.id;
    }

    async deleteUser(id) {
      const deleted = await this.database.collection(this.collectionPath).doc(id).delete();
      return id;
    }

    async hashPassword(password) {
      const saltRounds = 10;
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) reject(err)
          resolve(hash)
        });
      });
      return hashedPassword;
    }
  }
  module.exports = Database;
})();