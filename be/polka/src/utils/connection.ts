import mongoose from 'mongoose';

export default async function initDb(): Promise<any> {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      family:4,
    });
    console.log('DB connected');
    return db
  } catch (error) {
    console.error('DB connection failed', error);
    process.exit(1);
  }
}
