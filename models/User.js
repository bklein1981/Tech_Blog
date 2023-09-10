// import relevant parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import encryption module
const bcrypt = require('bcrypt');
// import our database connection from config.js
const sequelize = require('../config/connection');

//create user
class User extends Model {
    checkPassword(loginPwd) {
        return bcrypt.compareSync(loginPwd, this.password);
    }
}

//setup fields and rules for User 
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5],
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
              },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }

);

module.exports = User;
