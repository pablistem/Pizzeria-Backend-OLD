import { Model, Sequelize, DataTypes } from "sequelize";

export class OrderModel extends Model<any> {
  static setup(sequelizeInstance: Sequelize): typeof OrderModel {
    OrderModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        total: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        itemListId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: "Order",
        tableName: "orders",
        underscored: true,
        paranoid: true,
      }
    );

    return OrderModel;
  }
}
