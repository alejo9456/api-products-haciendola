import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Product } from './entities/product.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Product was created', type: Product  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiBody({
    description: 'Create Product DTO',
    type: CreateProductDto,
    examples: {
        example1: {
            summary: 'Another product example',
            description: 'Another example of a product object',
            value: {
                title: 'PAINTING SET 12 COLORS',
                handle: 'painting-set-12-colors',
                description: '<p><strong>Features:</strong></p>\r\n<ul>\r\n<li>Set includes 12 different colors of paint.</li>\r\n<li>Non-toxic and safe for children.</li>\r\n<li>Comes with brushes and mixing palette.</li>\r\n</ul>',
                sku: '123456789012',
                grams: 200,
                stock: 50,
                price: 800,
                compare_price: 900,
                barcode: '0123456789012',
                userId: 'f4be3e11-0af4-4c22-88b5-04781bffa481'
            },
        }
    },
  })
  create(
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of products with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
    example: 0,
    schema: { default: 0 },
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of products per page',
    example: 10,
    schema: { default: 10 },
  })
  @ApiResponse({ status: 200, description: 'List of products', type: Pagination })
  findAll( 
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
   ): Observable<Pagination<Product>> {
    return this.productsService.findAll({
      limit,
      page,
    });
  }

  @Get(':term')
  @ApiOperation({ summary: 'Get a product by term' })
  @ApiParam({ name: 'term', description: 'Term to search for the product (id, title, or handle)' })
  @ApiResponse({ status: 200, description: 'Product found', type: Product })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('term') term: string) {
    return this.productsService.findOne(term);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', description: 'ID of the product to update' })
  @ApiResponse({ status: 200, description: 'Product updated', type: Product })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', description: 'ID of the product to delete' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
