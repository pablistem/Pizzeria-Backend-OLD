import { Application, Request, Response, NextFunction } from "express";
import { ProductService } from "../application/service/product.service";
import { ProductRepository } from "../infrastructure/product.repository";
import { fromEntityToProductDto } from "../application/mapper/fromEntityToProductDto";
import { fromNewProductDtoToEntity } from "../application/mapper/fromNewProductDtoToEntity";
import { NewProductDto } from "../application/dto/newproduct.dto";
import { ProductDto } from "../application/dto/product.dto";
import { fromProductDtoToEntity } from "../application/mapper/fromProductDtoToEntity";

export class ProductController {
  baseRoute = "/product";

  constructor(
    private readonly productService: ProductService,
    private readonly productRepository: ProductRepository
  ) {}

  configureRoutes(app: Application): void {
    app.get(`${this.baseRoute}`, this.getProducts.bind(this));
    app.post(`${this.baseRoute}`, this.addProduct.bind(this));
    app.get(`${this.baseRoute}/:id`, this.getProductById.bind(this));
    app.put(`${this.baseRoute}/:id`, this.updateProduct.bind(this));
    app.delete(`${this.baseRoute}/:id`, this.deleteProduct.bind(this));
  }

  async getProducts(req: Request, res: Response): Promise<void> {
    const products = await this.productRepository.getAllProducts();

    const result = products?.map((product) => fromEntityToProductDto(product));

    res.json({ products: result });
  }

  async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    try {
      const product = await this.productService.getProductById(Number(id));

      res.json(fromEntityToProductDto(product));
    } catch (error) {
      next(error);
    }
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

  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const { body } = req;

    const productDto = new ProductDto({ ...body, id: id });

    try {
      productDto.validate();

      const productUpdated = await this.productService.updateProduct(
        fromProductDtoToEntity(productDto)
      );

      res.json(productUpdated);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    try {
      await this.productRepository.deleteProduct(Number(id));

      res.json({ message: "Product deleted" });
    } catch (error) {
      next(error);
    }
  }
}
