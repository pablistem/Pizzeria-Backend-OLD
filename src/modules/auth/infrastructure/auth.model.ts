

import { Model, Sequelize, DataTypes } from 'sequelize'

export class AuthModel extends Model<any> {
  static setup (sequelizeInstance: Sequelize): typeof AuthModel {
    AuthModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        refreshToken: {
          type: DataTypes.STRING,
          allowNull: false
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Auth',
        tableName: 'auth',
        underscored: true,
        paranoid: true
      }
    )
    return AuthModel
  }
}
