import { Model, Sequelize, DataTypes } from "sequelize";

export class ItemModel extends Model<any> {
  static setup(sequelizeInstance: Sequelize): typeof ItemModel {
    ItemModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        quantity: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        unitPrice: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        discount: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        subTotal: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        orderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: "Item",
        tableName: "items",
        underscored: true,
        paranoid: true,
      }
    );

    return ItemModel;
  }
}
