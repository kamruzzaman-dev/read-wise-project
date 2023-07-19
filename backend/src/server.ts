import mongoose from 'mongoose';
import configs from './config';
import app from './app';
import { Server } from 'http';

// Handling uncaught exceptions
process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(configs.db_url as string);
    console.log('Database connection established 😇');

    server = app.listen(configs.port, () => {
      console.log(
        `Server is running on port ${configs.port}`
      );
    });
  } catch (error) {
    console.log('Failed to connect to database', error);
  }
  // Gracefully shutting down the server in case of unhandled rejection
  process.on('unhandledRejection', error => {
    console.log(error);

    if (server) {
      // Close the server and log the error
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      // If server is not available, exit the process
      process.exit(1);
    }
  });
}

bootstrap();

// Handling SIGTERM signal
process.on('SIGTERM', () => {
  console.log('SIGTERM is received.');
  if (server) {
    // Close the server gracefully
    server.close();
  }
});
