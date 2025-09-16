import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
  ) {}

  async addToCart(customerId: number, item: any) {
    let cart = await this.cartRepo.findOneBy({ customerId });
    if (!cart) {
      cart = this.cartRepo.create({ customerId, items: [item] });
    } else {
      cart.items.push(item);
    }
    return this.cartRepo.save(cart);
  }

  async getCart(customerId: number) {
    return this.cartRepo.findOneBy({ customerId });
  }

  async clearCart(customerId: number) {
    const cart = await this.cartRepo.findOneBy({ customerId });
    if (cart) {
      await this.cartRepo.remove(cart);
    }
  }
}
