import { IsNotEmpty, IsNumber, IsPositive, IsString, Min, MinLength } from 'class-validator';
export class CreatePokemonDto {



    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    readonly name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(1)
    readonly number: number;

}
