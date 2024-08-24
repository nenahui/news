import type { CorsOptions } from 'cors';
import path from 'node:path';

const corsWhiteList = ['http://localhost:3000'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export const config = {
  publicPath: path.join(__dirname, 'public'),
  corsOptions,
  database: {
    host: 'localhost',
    user: 'root',
    password: 'pridumal',
    database: 'news_database',
  },
};
