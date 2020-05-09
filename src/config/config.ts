import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

let port = process.env.PORT;

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT;
}

export default { port };
