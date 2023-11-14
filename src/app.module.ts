import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/products/product.module';
import { CategoryModule } from './modules/categories/category.module';
import { Category } from './modules/categories/category.entity';
import { Product } from './modules/products/product.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
      host: 'dpg-cl9hgmdo7jlc73fdst6g-a.oregon-postgres.render.com',
      port: 5432,
      username: 'instance_shopping_list_user',
      password: 'hhx43WjA5QukHZ8RcH4deHH9xuXeetxg',
      database: 'instance_shopping_list',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Set to false in production
      
    }),TypeOrmModule.forFeature([Product, Category]),
    ProductModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
