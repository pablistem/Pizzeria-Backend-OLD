import { Product } from '../../domain/product.entity'

export const fromModelToEntity = ({
  id,
  name,
  description,
  category,
  image,
  price,
  stock,
  createdAt,
  updatedAt
}: any): Product => {
  const productEntity = new Product(
    id,
    name,
    description,
    image,
    price,
    category,
    stock,
    createdAt,
    updatedAt)

  return productEntity
}
