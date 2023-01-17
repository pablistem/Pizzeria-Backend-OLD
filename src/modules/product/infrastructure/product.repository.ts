import { Product } from '../domain/product.entity'
import { ProductModel } from './product.model'
import { fromModelToEntity } from '../application/mapper/fromModelToEntity'

export class ProductRepository {
  private readonly productModel: typeof ProductModel
  constructor (productModel: ProductModel) {
    this.productModel = productModel as any
  }

  async saveProduct (product: Product): Promise<Product> {
    const savedProduct = await this.productModel.create(product as any, { isNewRecord: Number.isNaN(product.id) })

    return fromModelToEntity(savedProduct)
  }

  async getAllProducts (): Promise<Product[] | null> {
    const products = await this.productModel.findAll()

    return products === null ? null : products.map((product) => fromModelToEntity(product))
  }
}
