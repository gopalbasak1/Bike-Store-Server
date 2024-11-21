import app from './app';
import config from './config';
import mongoose from 'mongoose';

async function main() {
  try {
    //mongoose connector
    await mongoose.connect(config.database_url as string);

    //server connector
    app.listen(config.port, () => {
      console.log(`Server on port ${config.port} ⚡`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
