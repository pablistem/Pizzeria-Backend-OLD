import { Model, Sequelize, DataTypes } from 'sequelize'

export class ItemModel extends Model<any> {
  static setup (sequelizeInstance: Sequelize): typeof ItemModel {
    ItemModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        orderId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        discount: {
          type: DataTypes.NUMBER,
          allowNull: false
        },
        subTotal: {
            type: DataTypes.NUMBER,
            allowNull: false
          }
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Item',
        tableName: 'items',
        underscored: true,
        paranoid: false
      }
    )
    return ItemModel
  }
}