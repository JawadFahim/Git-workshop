import mongoose from "mongoose";

const MONGO_URI = process.env.Mongo_URI as string;

if (!MONGO_URI) {
  throw new Error("Mongo_URI is not defined in environment variables");
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: typeof import("mongoose") | null; promise: Promise<typeof import("mongoose")> | null };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    }).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
