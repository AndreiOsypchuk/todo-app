import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {dbConnection} from './dbconfig';
import {grqlConfig} from './grqlconfig';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use('/graphql', grqlConfig);

dbConnection();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('running on', PORT));
