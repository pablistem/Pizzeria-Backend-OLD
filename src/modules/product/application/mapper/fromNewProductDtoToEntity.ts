import { Product } from '../../domain/product.entity'
import { NewProductDto } from '../dto/newproduct.dto'

export const fromNewProductDtoToEntity = ({
  name,
  description,
  category,
  image,
  price,
  stock

}: NewProductDto): Product => {
  const productEntity = new Product(
    undefined,
    name,
    description,
    image,
    price,
    category,
    stock
  )

  return productEntity
}
