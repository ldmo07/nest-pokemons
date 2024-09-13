import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    ConfigModule, 
    //!defino el modelo de datos para poder inyectar o usar el schema en este modulo
    MongooseModule.forFeature([{
      name:Pokemon.name,
      schema: PokemonSchema
    }])
  ],
  exports:[
    MongooseModule
  ]
})
export class PokemonModule {}
