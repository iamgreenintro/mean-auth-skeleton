import { config } from 'dotenv';

// Grab config file based on NODE_ENV value:
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

// Export the environment variables to be accessible to our application:
export const {
  NODE_ENV,
  API_PORT,
  API_HOSTNAME,
  DB_CONNECTION_STRING,
  DB_CONNECTION_NAME,
  ACCESS_CONTROL_ALLOW_ORIGIN_VALUE,
} = process.env;
