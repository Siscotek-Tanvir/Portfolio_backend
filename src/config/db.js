import mongoose from 'mongoose';
import { ENV } from './env.js';

let cachedConnection = global.mongooseConnection;

if (!cachedConnection) {
  cachedConnection = global.mongooseConnection = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  if (!cachedConnection.promise) {
    const opts = {
      bufferCommands: false,
      autoIndex: true,
    };

    cachedConnection.promise = mongoose.connect(ENV.MONGO_URI, opts).then((mongooseInstance) => {
      console.log(`[Database] MongoDB Connected: ${mongooseInstance.connection.host}`);
      return mongooseInstance;
    });
  }

  try {
    cachedConnection.conn = await cachedConnection.promise;
  } catch (error) {
    cachedConnection.promise = null;
    console.error(`[Database Error] ${error.message}`);
    throw error;
  }

  return cachedConnection.conn;
};
