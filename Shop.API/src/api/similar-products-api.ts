import express, { Request, Response, Router } from 'express';
import {
  type IProductEntity,
  type SimilarProductCreatePayload,
  type SimilarProductDeletePayload,
} from '../../types';
import { connection } from '../../index';
import { mapProductsEntity } from '../services/mapping';
import { ResultSetHeader } from 'mysql2';
import {
  DELETE_PRODUCTS_FROM_SIMILAR,
  DELETE_SIMILAR_PRODUCTS,
  INSERT_SIMILAR_PRODUCT,
  SELECT_SIMILAR_PRODUCTS,
} from '../services/queries';
import { body, param, validationResult } from 'express-validator';

export const similarProductsRouter = Router();
const app = express();
const jsonMiddleware = express.json();
app.use(jsonMiddleware);

similarProductsRouter.get(
  `/:id`,
  [param('id').isUUID().withMessage('Product id is not UUID')],
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
        return;
      }

      const [rows] = await connection.query<IProductEntity[]>(
        SELECT_SIMILAR_PRODUCTS,
        [req.params.id]
      );

      if (!rows[0]) {
        res.status(404);
        res.send(
          `Similar products for product with id ${req.params.id} not found`
        );
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(mapProductsEntity(rows));
    } catch (err: any) {
      console.debug(err.message);
      res.status(500);
      res.send('Something went wrong');
    }
  }
);

similarProductsRouter.post(
  '/',
  [
    body().isArray().withMessage('Similar products should be array'),
    body('*')
      .isArray({ min: 2, max: 2 })
      .withMessage('Similar product should be pair')
      .custom((value) => value[0] !== value[1])
      .withMessage('Product should not be similar to itself'),
    body('*.*').isUUID().withMessage('Similar product id should be UUID'),
  ],
  async (req: Request<{}, {}, SimilarProductCreatePayload>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      res.json({ errors: errors.array() });
      return;
    }

    try {
      await connection.query<ResultSetHeader>(INSERT_SIMILAR_PRODUCT, [
        req.body,
      ]);

      res.status(201);
      res.send('All similar products have been added!');
    } catch (error: any) {
      console.debug(error.message);
      res.status(500);
      res.send('Server error. Similar products have not been created');
    }
  }
);

similarProductsRouter.delete(
  `/`,
  [
    body().isArray().withMessage('Similar products should be array'),
    body('*').isUUID().withMessage('Similar product id should be UUID'),
  ],
  async (req: Request<{}, {}, SimilarProductDeletePayload>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      res.json({ errors: errors.array() });
      return;
    }

    try {
      await connection.query<ResultSetHeader>(DELETE_PRODUCTS_FROM_SIMILAR, [
        [req.body],
        [req.body],
      ]);

      res.status(200);
      res.send('Similar products have been deleted!');
      res.end();
    } catch (error: any) {
      console.debug(error.message);
      res.status(500);
      res.send('Something went wrong');
    }
  }
);

similarProductsRouter.delete(
  `/:id`,
  [
    param('id').isUUID().withMessage('Product id is not UUID'),
    body().isArray().withMessage('Similar products should be array'),
    body('*').isUUID().withMessage('Similar product id should be UUID'),
  ],
  async (
    req: Request<{ id: string }, {}, SimilarProductDeletePayload>,
    res: Response
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      res.json({ errors: errors.array() });
      return;
    }

    try {
      await connection.query<ResultSetHeader>(DELETE_SIMILAR_PRODUCTS, [
        req.params.id,
        [req.body],
      ]);

      res.status(200);
      res.send('Similar products have been deleted!');
      res.end();
    } catch (error: any) {
      console.debug(error.message);
      res.status(500);
      res.send('Something went wrong');
    }
  }
);
