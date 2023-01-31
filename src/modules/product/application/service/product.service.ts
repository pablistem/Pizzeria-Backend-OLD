import { Product } from "../../domain/product.entity";
import { type ProductRepository } from "../../infrastructure/product.repository";
import { ProductEntityNotDefined } from "../error/ProductEntityNotDefined";
import { ProductNotFound } from "../error/ProductNotFound";

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async addProduct(product: Product): Promise<Product> {
    if (!(product instanceof Product)) {
      throw new ProductEntityNotDefined();
    }

    const savedProduct = await this.productRepository.saveProduct(product);

    return savedProduct;
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.getProductById(id);

    if (!product) {
      throw new ProductNotFound();
    }

    return product;
  }

  async updateProduct(newProductData: Product): Promise<Product> {
    const updateProduct = await this.productRepository.saveProduct(
      newProductData
    );

    if (!updateProduct) {
      throw new ProductNotFound(newProductData.id);
    }

    return updateProduct;
  }
}
