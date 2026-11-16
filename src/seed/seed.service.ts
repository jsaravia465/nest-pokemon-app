import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios, { AxiosInstance } from 'axios';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { Pokedex } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';


@Injectable()
export class SeedService {
  private readonly axiosInstance: AxiosInstance;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpAdapter: AxiosAdapter
  ) {
    this.axiosInstance = axios.create();
  }
  async executeSeed(): Promise<Pokedex> {
    await this.pokemonModel.deleteMany({});
    const { data } = await this.httpAdapter.get<Pokedex>('https://pokeapi.co/api/v2/pokemon?limit=10');

   const docs = data.results.map(({ name, url }) => {
       const segment = url.split('/');
       console.log('segment',segment);
       const number = segment.at(-2);

       console.log({name,number});
       return { name, number };
    });
   console.log({docs});

   const inserted = await this.pokemonModel.insertMany(docs);

   console.log({inserted});

   return data;
    
  }
}
