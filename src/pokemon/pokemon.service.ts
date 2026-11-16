import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException    } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';

import { Pokemon } from './entities/pokemon.entity';



@Injectable()
export class PokemonService {

  private readonly defaultLimit: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService : ConfigService,
   
  ) {

      this.defaultLimit = this.configService.getOrThrow<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const createdPokemon = new this.pokemonModel(createPokemonDto);
      return await createdPokemon.save();
    } catch (error : any) {
        if (error.code === 11000) {
          throw new BadRequestException (`Pokemon with the same name or number already exists.`);
        }
       
        throw new InternalServerErrorException(`Failed to create Pokemon: ${error.message}`);
     
    }     
     
  }

    findAll( paginationDto: PaginationDto ) {
  

    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return this.pokemonModel.find()
      .limit( limit )
      .skip( offset )
      .sort({
        no: 1
      })
      .select('-__v');
      
  }

  async findOne(id: string) {
    let pokemon: Pokemon | null = null;
      if (!Number.isNaN(Number(id))) {
        pokemon = await this.pokemonModel.findOne({ number: Number(id) });
      }
     if (isValidObjectId(id)) {
       pokemon = await this.pokemonModel.findById(id);
     }

    pokemon ??= await this.pokemonModel.findOne({ name: id });

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found.`);
    }

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    
    const pokemon = await this.findOne(id);
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found.`);
    } else {

      try {
        await pokemon.updateOne(updatePokemonDto);
      } catch (error : any) {
         if (error.code === 11000) {
           throw new BadRequestException(`Pokemon with the same name or number already exists.`);
         }
         throw new InternalServerErrorException(`Failed to update Pokemon: ${error.message}`);
      }
    }
       

    return {...pokemon.toJSON(), ...updatePokemonDto};
  }

  remove(id: string) {
    return `This action removes a #${id} pokemon`;
  }
}
