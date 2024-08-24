import express from 'express';
import mysqlDb from './mysqlDb';
import { commentsRouter } from './routers/comments';
import { newsRouter } from './routers/news';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};

run().catch((err) => {
  console.error(err);
});
