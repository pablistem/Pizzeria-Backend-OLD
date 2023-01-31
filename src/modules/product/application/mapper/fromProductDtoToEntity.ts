import { Product } from "../../domain/product.entity";
import { ProductDto } from "../dto/product.dto";

export const fromProductDtoToEntity = ({
  id,
  name,
  description,
  category,
  image,
  price,
  stock,
}: ProductDto): Product => {
  const productEntity = new Product(
    id,
    name,
    description,
    image,
    price,
    category,
    stock
  );

  return productEntity;
};
