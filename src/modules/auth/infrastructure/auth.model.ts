

import { Model, Sequelize, DataTypes } from 'sequelize'
import { Auth } from '../domain/auth.entity'

export class AuthModel extends Model {
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
        userId: {
          type: DataTypes.NUMBER,
          allowNull: false,
        }
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Auth',
        tableName: 'auths',
        underscored: true,
        paranoid: true
      }
    )
    return AuthModel
  }
}
