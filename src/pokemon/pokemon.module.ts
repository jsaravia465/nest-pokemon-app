import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonSchema } from './entities/pokemon.entity';
import { CommonModule } from '../common/common.module';
import { ConfigService } from '@nestjs/config';
@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [ MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
    ConfigModule],
  exports: [ MongooseModule ],
})
export class PokemonModule {}
