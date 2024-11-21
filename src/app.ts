import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//server live
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server on live 🏃🏾‍♀️‍➡️',
  });
});

export default app;
