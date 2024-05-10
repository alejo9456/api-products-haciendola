import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { validate as isUUID } from 'uuid';
import { User } from '../auth/entities/user.entity';
import { Observable, from, map } from 'rxjs';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createProductDto: CreateProductDto) {
    try {

      const user = await this.userRepository.findOneBy({ id: createProductDto.userId });
        if (!user) {
            throw new NotFoundException(`User with id ${createProductDto.userId} not found`);
      }

      const product = this.productRepository.create({
        ...createProductDto,
        user: user
      });
      await this.productRepository.save( product );
      return product;

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda');
    }
  }

  findAll( options: IPaginationOptions): Observable<Pagination<Product>> {
    return from(
      this.productRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 10,
      }),
    ).pipe(
      map(([products, totalProducts]) => {
        const productsPageable: Pagination<Product> = {
          items: products,
          meta: {
            currentPage: Number(options.page),
            itemCount: products.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalProducts,
            totalPages: Math.ceil(totalProducts / Number(options.limit)),
          },
        };
        return productsPageable;
      }),
    );
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

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      this.handleDBExceptions(error);
    }

  }
}
