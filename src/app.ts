import express, { Express, Request, Response, Application } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import routes from './routes';
import { errors } from 'celebrate';
import { environmentConfig } from './constants/index';
import helmet from 'helmet';
import morgan from 'morgan';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import { default as swaggerDocument } from './swagger/swagger.json';
import swaggerUi from 'swagger-ui-express';

dotenv.config();
export class App {
  private app: Application = express();

  constructor() {
    this.app.use(helmet());
    this.app.use(ExpressMongoSanitize());
    this.app.use(express.json());
    this.app.use(morgan('tiny'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use((request, response, next) => {
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Headers', '*');
      response.header('Access-Control-Allow-Methods', '*');
      next();
    });

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.app.use(routes);
    this.app.get("*", (req, res) => {
      res.status(404).send("Page Not Found")
    })
    this.app.use(errors());
  }
  public async listen() {
    await mongoose.connect(environmentConfig.MONGOOSE_URL)
      .then(() => {
        console.log("Connected to Mongoose")
      })
      .catch(()=>{
        console.log("Database Connectivity Failed")
      })
    this.app.listen(environmentConfig.PORT, () => {
      console.log(`Server running on ${environmentConfig.PORT}`);
    });
    return this.app;
  }
}
