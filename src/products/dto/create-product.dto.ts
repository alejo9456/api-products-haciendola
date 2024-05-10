import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        description: 'Title of the product',
        example: 'COLA GLITTER 23 GRS',
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        description: 'Unique handle for the product (slug)',
        example: 'cola-glitter-23-grs',
        required: false,
    })
    @IsString()
    @IsOptional()
    handle?: string;
    
    @ApiProperty({
        description: 'Description of the product in HTML format',
        example: '<p><strong>Características:</strong></p><ul><li>For sticking, outlining, decorating, and painting on paper, cardboard, and cardstock.</li><li>Intense glitter effect.</li><li>Washable (does not stain clothes).</li></ul>',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'SKU (Stock Keeping Unit) for the product',
        example: '60870131001',
    })
    @IsString()
    sku: string;

    @ApiProperty({
        description: 'Weight in grams of the product',
        example: 120,
    })
    @IsNumber()
    @IsPositive()
    grams: number;

    @ApiProperty({
        description: 'Stock quantity of the product',
        example: 1013,
        required: false,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({
        description: 'Price of the product',
        example: 1161,
        required: false,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;
    
    @ApiProperty({
        description: 'Compare price for the product (original price before discount)',
        example: 1290,
        required: false,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    compare_price?:number; 

    @ApiProperty({
        description: 'Compare price for the product (original price before discount)',
        example: 1290,
        required: false,
    })
    @IsString()
    @IsOptional()
    barcode?: string;

    @ApiProperty({
        description: 'ID of the user who created the product',
        example: 'f4be3e11-0af4-4c22-88b5-04781bffa481',
    })
    @IsString()
    userId: string;
}