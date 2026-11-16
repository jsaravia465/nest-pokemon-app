import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { appConfig } from './config/app.config';


@Module({
  imports: [
    ConfigModule.forRoot(
      { load: [appConfig] }
    ),
    MongooseModule.forRoot(process.env.MONGODB as string,{
      dbName: 'pokedex'
    }),
    PokemonModule,
    SeedModule,
    CommonModule],
  
 
})
export class AppModule {}
