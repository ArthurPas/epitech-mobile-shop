import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { ProductInShop, ProductOFF } from './dto/product-info.dto';

const urlOpenFoodFact = 'https://world.openfoodfacts.org/api/v2/product';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(openFoodFactId: number): Promise<ProductInShop | undefined> {
    const product = await this.productRepository.findOne({
      where: { open_food_fact_id: String(openFoodFactId) },
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    const response = await fetch(
      `${urlOpenFoodFact}/${product.open_food_fact_id}`,
    );
    if (!response.ok) {
      throw new HttpException(
        `Failed to get info from open food fact with product id ${product.id} with open food fact
         id : ${product.open_food_fact_id}`,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    const productOFF: ProductOFF = await response.json();

    const shop = await this.shopRepository.findOne({
      where: { id: 1 },
    });
    if (!shop) {
      throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }
    return await this.getProductInfos(product, shop, productOFF);
  }

  async getProductInfos(
    product: Product,
    shop: Shop,
    productOFF: ProductOFF,
  ): Promise<ProductInShop> {
    const inventory = await this.inventoryRepository.findOne({
      relations: ['product', 'shop'],
      where: { product, shop },
    });
    if (!inventory) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    const productInShop: ProductInShop = {
      ...productOFF,
      available: inventory.quantity > 0,
      availableQuantity: inventory.quantity,
      price: inventory.price,
    };
    return productInShop;
  }

  async findProductQuantity(product: Product, shop: Shop): Promise<number> {
    const inventory = await this.inventoryRepository.findOne({
      relations: ['product', 'shop'],
      where: { product, shop },
    });
    if (!inventory) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return inventory.quantity;
  }

  async findProductPrice(product: Product, shop: Shop): Promise<number> {
    const inventory = await this.inventoryRepository.findOne({
      relations: ['product', 'shop'],
      where: { product, shop },
    });
    if (!inventory) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return inventory.price;
  }

  async isProductAvailable(product: Product, shop: Shop): Promise<boolean> {
    const inventory = await this.inventoryRepository.findOne({
      relations: ['product', 'shop'],
      where: { product, shop },
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return inventory.quantity > 0;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
