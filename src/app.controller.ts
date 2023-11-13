import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './modules/products/product.entity';

@Controller('api/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('product')
  async getAll() {
    return this.appService.getAllProducts();
  }

  @Get('category')
  async getAllCategories() {
    return this.appService.getAllCategories();
  }

  @Post('product')
  addProduct(
    @Body() data: Product
  ){
    return this.appService.createProduct(data)
  }
}
