import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {dbConnection} from './dbconfig';
import {grqlConfig} from './grqlconfig';

dotenv.config();

const app = express();
app.enable('trust proxy');
app.use(express.json());
app.use(cookieParser());

const whitelist = [
  'http://localhost:3000',
  'https://obscure-oasis-89110.herokuapp.com',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('not allowed by cors'));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use('/graphql', grqlConfig);

dbConnection();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('running on', PORT));
