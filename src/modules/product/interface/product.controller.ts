import { Application, Request, Response, NextFunction } from "express";
import { ProductService } from "../application/service/product.service";
import { ProductRepository } from "../infrastructure/product.repository";
import { fromEntityToProductDto } from "../application/mapper/fromEntityToProductDto";
import { fromNewProductDtoToEntity } from "../application/mapper/fromNewProductDtoToEntity";
import { NewProductDto } from "../application/dto/newproduct.dto";

export class ProductController {
  baseRoute = "/product";

  constructor(
    private readonly productService: ProductService,
    private readonly productRepository: ProductRepository
  ) {}

  configureRoutes(app: Application): void {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    app.get(`${this.baseRoute}`, this.getProducts.bind(this));
    app.post(`${this.baseRoute}`, this.addProduct.bind(this));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async getProducts(req: Request, res: Response): Promise<void> {
    const products = await this.productRepository.getAllProducts();

    const result = products?.map((product) => fromEntityToProductDto(product));

    res.json({ products: result });
  }

  async addProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { body } = req;

    try {
      const productDto = new NewProductDto(body);
      productDto.validate();

      const savedProduct = await this.productService.addProduct(
        fromNewProductDtoToEntity(productDto)
      );

      res.json({ createdProduct: fromEntityToProductDto(savedProduct) });
    } catch (error) {
      next(error);
    }
  }
}
