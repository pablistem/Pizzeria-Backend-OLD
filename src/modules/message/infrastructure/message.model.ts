import { Model, Sequelize, DataTypes } from "sequelize";

export class MessageModel extends Model<any> {
  static setup(sequelizeInstance: Sequelize): typeof MessageModel {
    MessageModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: "Message",
        tableName: "messages",
        underscored: true,
        paranoid: true,
      }
    );

    return MessageModel;
  }
}
