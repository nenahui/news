import express from 'express';

export const exampleRouter = express.Router();

exampleRouter.get('/', (req, res, next) => {
  try {
    return res.send('Get response!');
  } catch (e) {
    next(e);
  }
});

exampleRouter.post('/', (req, res, next) => {
  try {
    return res.send('Post response!');
  } catch (e) {
    next(e);
  }
});
