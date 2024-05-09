import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid';


@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto) {
    try {

      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save( product );
      console.log(product);
      return product;

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda');
    }
  }

  findAll( paginationDto : PaginationDto) {

    const { limit =10, offset= 0 } = paginationDto;
    return this.productRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {

    let product: Product;

    if( isUUID(term)){
      product = await this.productRepository.findOneBy({ id: term});
    }else{
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
        .where('UPPER(title) =:title or handle =:term', {
          title: term.toUpperCase(),
          handle: term.toLowerCase(),
        }).getOne();
    }

    if(!product ) throw new NotFoundException(`Product with id ${term} not found`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto
    });

    if(!product) throw new NotFoundException(`Product with id: ${id} not found`);

    await this.productRepository.save( product );
    return product;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product); 
  }
}
