// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
import firebaseConfig from './db_config';

import "firebase/auth";
import "firebase/database"
import "firebase/firestore";
import "firebase-admin";

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

    const documents = snapshots.docs.map(doc =>
      doc.data()
    );

    return documents;
  }

  /**
   * Inserts a user into firestore, takes a User object and returns boolean if it was succesful or not.
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

export default Database;
