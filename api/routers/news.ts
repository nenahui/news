import express from 'express';
import type { ResultSetHeader } from 'mysql2';
import { imagesUpload } from '../multer';
import mysqlDb from '../mysqlDb';
import type { News, NewsMutation } from '../types';

export const newsRouter = express.Router();

newsRouter.get('/', async (req, res, next) => {
  try {
    const [news] = await mysqlDb.getConnection().query('select id, title, image, createdAt from news');
    return res.status(200).send(news);
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
        message: 'News not found',
      });
    }

    return res.status(200).send(newsResult[0]);
  } catch (e) {
    next(e);
  }
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const body = req.body;
    const file = req.file;

    if (!body.content || !body.title) {
      return res.status(400).send({
        message: 'The title and content of the news are required!',
      });
    }

    const news: NewsMutation = {
      title: body.title,
      content: body.content,
      image: file ? file.filename : null,
    };

    const insertResult = await mysqlDb
      .getConnection()
      .query('insert into news (title, content, image) values (?, ?, ?);', [news.title, news.content, news.image]);
    const resultHeader = insertResult[0] as ResultSetHeader;
    const getNewResult = await mysqlDb
      .getConnection()
      .query('select * from news where id = ?;', [resultHeader.insertId]);
    const response = getNewResult[0] as News[];

    return res.status(201).send(response[0]);
  } catch (e) {
    next(e);
  }
});

newsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await mysqlDb.getConnection().query('select * from news items where id = ?;', [id]);
    const findResult = item[0] as News[];

    if (findResult.length === 0) {
      return res.status(404).send({
        error: 'News not found',
      });
    }

    const deleteResponse = await mysqlDb.getConnection().query('delete from news where id = ?;', [id]);
    const deleteResult = deleteResponse[0] as ResultSetHeader;

    if (deleteResult.affectedRows === 0) {
      return res.status(500).send({
        error: 'Something went wrong',
      });
    }

    return res.status(200).send({
      message: 'News deleted successfully',
    });
  } catch (e) {
    next(e);
  }
});
