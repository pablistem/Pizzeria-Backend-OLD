import { Model, Sequelize, DataTypes } from 'sequelize'

export class ProductModel extends Model<any> {
  static setup (sequelizeInstance: Sequelize): typeof ProductModel {
    ProductModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false
        },
        price: {
          type: DataTypes.NUMBER,
          allowNull: false
        },
        stock: {
          type: DataTypes.NUMBER,
          allowNull: false
        }
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Product',
        tableName: 'Products',
        underscored: true,
        paranoid: true
      }
    )
    return ProductModel
  }
}
