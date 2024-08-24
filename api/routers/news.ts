import express from 'express';
import type { RowDataPacket } from 'mysql2';
import mysqlDb from '../mysqlDb';
import type { News } from '../types';

export const newsRouter = express.Router();

newsRouter.get('/', async (req, res, next) => {
  try {
    const [news] = await mysqlDb.getConnection().query('select id, title, image, createdAt from news');
    return res.send(news);
  } catch (e) {
    next(e);
  }
});

newsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const news = await mysqlDb.getConnection().query('select * from news where id = ?;', [id]);
    const newsResult = news[0] as News[];

    if (newsResult.length === 0) {
      return res.status(404).send({
        message: 'Not Found',
      });
    }

    return res.send(newsResult[0]);
  } catch (e) {
    next(e);
  }
});
