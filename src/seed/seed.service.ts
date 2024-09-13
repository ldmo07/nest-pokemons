import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.intreface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  
  constructor(
    @InjectModel(Pokemon.name) 
    private readonly pokemonModel : Model<Pokemon>,
    private readonly http : AxiosAdapter
  ) {}

  async executeSeed() {
    
   const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

   await this.pokemonModel.deleteMany({}); // es lo mismo que un delete * from

   const insertPromiseArray = [];

   const pokemonToInsert: {name:string, no:number}[] = [];

    data.results.forEach(async({name,url})=>{
      
      const segments = url.split('/');
      
      const no: number = +segments[segments.length - 2]

      //realizo la insercion opcion 1
      //const pokemon = await this.pokemonModel.create({name,no});

      //realizo la insercion opcion 2
      // insertPromiseArray.push(
      //   this.pokemonModel.create({name,no})
      // );

      //realizo la insercion opcion 3
      pokemonToInsert.push({name,no});

    });

    //realizo la insercion opcion 2
    //await Promise.all(insertPromiseArray);


    //realizo la insercion opcion 3
    await this.pokemonModel.insertMany(pokemonToInsert);

    //return data.results;
    return 'Seed Excuted'
  }

  
}
