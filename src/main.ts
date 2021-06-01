import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import * as express from 'express';
import * as firebase from 'firebase-admin';
import * as functions from 'firebase-functions';

import { AppModule } from './app.module';

exports.api = functions.region( 'europe-west2' ).https.onRequest( async ( req , res ): Promise<any> => {

  const server = express();
  const createNestServer = async ( expressInstance ) => {

    const app = await NestFactory.create( AppModule ,
      new ExpressAdapter( expressInstance ),
    );

    app.enableCors({
      origin: [
        'add-your-origin-domains-here',
      ],
      optionsSuccessStatus: 200,
    });

    return app.init();

  };

  await createNestServer( server );
  return server( req , res );

});
