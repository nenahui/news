import express from 'express';
import { exampleRouter } from './routers/example';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/example', exampleRouter);

const run = async () => {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};

run().catch((err) => {
  console.error(err);
});
