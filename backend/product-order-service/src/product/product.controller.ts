import { Controller, Get, Post, Body, Param, ParseIntPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async create(@Body() body: any) {
    return this.productService.createProduct(body);
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + extname(file.originalname));
      }
    })
  }))
  async createWithImage(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.productService.createProduct({
      name: body.name,
      price: body.price,
      image: `/uploads/${file.filename}`, // save image path in DB
    });
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

}
