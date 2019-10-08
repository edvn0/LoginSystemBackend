const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.app,
};

const collectionPath = process.env.collectionPath;

const privateKey = process.env.privateKey;

const googleApiKey = process.env.googleApiKey;

module.exports = {
  firebaseConfig,
  collectionPath,
  privateKey,
  googleApiKey
};