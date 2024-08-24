import express from 'express';
import type { ResultSetHeader } from 'mysql2';
import mysqlDb from '../mysqlDb';
import type { Comment, CommentMutation, News } from '../types';

export const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    let queryResponse = 'select * from comment';
    const queryId = req.query.news_id;

    if (queryId) {
      queryResponse = 'select * from comment where news_id = ?';
    }

    const [comments] = await mysqlDb.getConnection().query(queryResponse, [queryId]);

    return res.status(200).send(comments);
  } catch (e) {
    next(e);
  }
});

commentsRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;

    if (!body.news_id || !body.text) {
      return res.status(400).send({
        message: 'The news_id and text are required!',
      });
    }

    const comment: CommentMutation = {
      news_id: body.news_id,
      author: body.author || 'Anonymous',
      text: body.text,
    };

    const newsResponse = await mysqlDb.getConnection().query('select * from news where id = ?;', [body.news_id]);
    const newsResult = newsResponse[0] as News[];

    if (newsResult.length === 0) {
      return res.status(400).send({
        message: `News with ID ${body.news_id} does not exist`,
      });
    }

    const insertResult = await mysqlDb
      .getConnection()
      .query('insert into comment (news_id, author, text) values (?, ?, ?);', [
        comment.news_id,
        comment.author,
        comment.text,
      ]);
    const resultHeader = insertResult[0] as ResultSetHeader;
    const getNewResult = await mysqlDb
      .getConnection()
      .query('select * from comment where id = ?;', [resultHeader.insertId]);
    const response = getNewResult[0] as Comment[];

    return res.status(201).send(response[0]);
  } catch (e) {
    next(e);
  }
});

commentsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const commentResponse = await mysqlDb.getConnection().query('select * from comment where id = ?;', [id]);
    const commentResult = commentResponse[0] as Comment[];

    if (commentResult.length === 0) {
      return res.status(404).send({
        message: 'Comment not found',
      });
    }

    const deleteResponse = await mysqlDb.getConnection().query('delete from comment where id = ?;', [id]);
    const deleteResult = deleteResponse[0] as ResultSetHeader;

    if (deleteResult.affectedRows === 0) {
      return res.status(500).send({
        error: 'Something went wrong',
      });
    }

    return res.status(200).send({
      message: 'Successfully deleted comment',
    });
  } catch (e) {
    next(e);
  }
});
