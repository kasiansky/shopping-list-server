import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './modules/products/product.entity';
import { Category } from './modules/categories/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async getAllProducts() {
    const products = await this.productRepository.find({
      relations: ["category"]
    })
    const total = await this.productRepository.count();
    return {
      products,
      total,
    };
  }

  async getAllCategories() {
   return  this.categoryRepository.find({ });
  }

  async createProduct(data) {

   
    const existingProduct = await this.productRepository.findOne({
      where: {
        name: data.name,
        category: {
          id: data.categoryId,
        },
      },
      relations: ["category"],
      join: {
        alias: 'product',
        leftJoinAndSelect: {
          category: 'product.category',
        },
      },
    });

    if(existingProduct && existingProduct?.category?.id === data.categoryId) {
      const updatedProduct = new Product();
      updatedProduct.category = existingProduct.category;
      updatedProduct.id = existingProduct.id;
      updatedProduct.amount = existingProduct.amount + 1;
      updatedProduct.name = existingProduct.name;
      return  this.productRepository.save(updatedProduct);
    } else {
      console.log("error");
      const category = await this.categoryRepository.findOne({where: {id: data.categoryId}});
      if(category) {
        const product = {
          ...data,
          amount: 1,
          category: category
        }
        return  this.productRepository.save(product);
      }
      
    }

   
    
  }

}
