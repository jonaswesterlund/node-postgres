import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/config';
import { stream, jsonFormat } from './config/logging';
import {
  MikroORM,
  EntityManager,
  RequestContext,
  EntityRepository,
} from 'mikro-orm';
import { logger } from './config/logging';
import { entities } from './routes';
import initTestData from './utils/testData';
import { BaseEntity } from './entities/BaseEntity';

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  entityRepository: EntityRepository<BaseEntity>;
};

const app = express();

(async () => {
  /* DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;
  DI.entityRepository = DI.orm.em.getRepository(BaseEntity);

  const generator = DI.orm.getSchemaGenerator();
  await generator.dropSchema();
  await generator.createSchema();

  const migrator = DI.orm.getMigrator();
  await migrator.up();
 */
  await initTestData();

  app.use(cors());
  app.use(express.json());

  app.use(morgan(jsonFormat, { stream }));

  app.use('/api/entities', entities);

  /*   app.use((req: Request, res: Response, next: NextFunction) => {
    RequestContext.create(DI.orm.em, next);
  }); */

  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }
    const status = error.status || 500;
    logger.error(error.message, {
      status,
      config: error.config,
      url: error.url,
      stack: error.stack,
      requestUrl: req.url,
      requestBody: req.body,
    });
    res.end(status);
  });

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
})();
