import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    //!defino el modelo de datos para poder inyectar o usar el schema en este modulo
    MongooseModule.forFeature([{
      name:Pokemon.name,
      schema: PokemonSchema
    }])
  ]
})
export class PokemonModule {}
