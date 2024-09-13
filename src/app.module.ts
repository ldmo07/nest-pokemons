import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';


@Module({
  imports: [

    //! ESTA LINEA ME AYUDA DAR MANEJO A LAS VARIABLES DE ENTORNO DE LAS .Env
    //ConfigModule.forRoot(), //* sin usar objeto de configuracion
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      validationSchema: JoiValidationSchema
    }), //* usando objeto de configuracion


    //!CONFIGURO LA LECTURA DE CONTENIDO ESTATICO
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public')
    }),

    //!CONFIGURO LA BD
    //MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    MongooseModule.forRoot(process.env.MONGODB,{
      dbName:'pokemonsdb'
    }),

    PokemonModule,

    CommonModule,

    SeedModule,
  ]
})
export class AppModule {}
