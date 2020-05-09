import express, { NextFunction, Response, Request } from 'express';

export const entities = express.Router();

entities.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json([]);
  } catch (error) {
    next(error);
  }
});
