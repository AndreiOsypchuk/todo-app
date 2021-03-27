import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {dbConnection} from './dbconfig';
import {grqlConfig} from './grqlconfig';
import {shouldSendSameSiteNone} from 'should-send-same-site-none';
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
    // origin: 'http://localhost:3001',
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use(shouldSendSameSiteNone);

app.use('/graphql', grqlConfig);

dbConnection();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('running on', PORT));
