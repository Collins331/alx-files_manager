require('dotenv').config();
const { MongoClient } = require('mongodb');

// Environment variables
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

class DBClient {
  constructor() {
    this.client = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}`);
    this.client.connect().then(() => {
      this.db = this.client.db(DB_DATABASE);
    }).catch((err) => {
      console.error('Failed to connect to MongoDB', err);
    });
  }
  isAlive() {
    return this.client.isConnected();
  }
  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      return await usersCollection.countDocuments();
    } catch (err) {
      console.error('Error counting users', err);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      return await filesCollection.countDocuments();
    } catch (err) {
      console.error('Error counting files', err);
      return 0;
    }
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
