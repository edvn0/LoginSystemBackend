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

  /**
   * Get all users from database!
   * @returns []
   */
  async getUsers() {
    const snapshots = await this.database.collection('Users').get();

    const documents = snapshots.docs.map(doc =>
      doc.data()
    );

    return documents;
  }

}

export default Database;
