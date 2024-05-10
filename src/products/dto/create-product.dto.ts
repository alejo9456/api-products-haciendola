import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @IsOptional()
    handle?: string;
    
    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    sku: string;

    @IsNumber()
    @IsPositive()
    grams: number;

    
    @IsNumber()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;
    
    @IsNumber()
    @IsPositive()
    @IsOptional()
    compare_price?:number; 

    @IsString()
    @IsOptional()
    barcode?: string;

    @IsString()
    userId: string;
}