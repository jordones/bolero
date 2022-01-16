import express from 'express';
import compression from 'compression';
import cors from 'cors'; 

export default () => {
  const application = express();
  application.use(express.json());
  application.use(compression());
  const corsOptions = {
    credentials: true,
    origin: true
  };
  application.use(cors(corsOptions));
  return application;
};