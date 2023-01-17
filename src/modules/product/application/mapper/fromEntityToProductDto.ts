import { Product } from '../../domain/product.entity'
import { ProductDto } from '../dto/product.dto'

export const fromEntityToProductDto = ({
  id,
  name,
  description,
  category,
  image,
  price,
  stock
}: Product): ProductDto => {
  const productDto = new ProductDto(
    {
      id: Number(id),
      name,
      description,
      image,
      price,
      category,
      stock
    }
  )

  return productDto
}
