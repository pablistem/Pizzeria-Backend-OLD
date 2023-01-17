import { Product } from '../../domain/product.entity'
import { type ProductRepository } from '../../infrastructure/product.repository'
import { ProductEntityNotDefined } from '../error/ProductEntityNotDefined'

export class ProductService {
  constructor (private readonly productRepository: ProductRepository) {}

  async addProduct (product: Product): Promise<Product> {
    if (!(product instanceof Product)) {
      throw new ProductEntityNotDefined()
    }

    const savedProduct = await this.productRepository.saveProduct(product)

    return savedProduct
  }
}
