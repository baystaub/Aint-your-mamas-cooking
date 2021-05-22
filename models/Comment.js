const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Comment extends Model {}

Comment.init(
    {
        id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
        },
        comment: {
            type:DataTypes.TEXT,
            allowNull:false
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'user',
                key:'id'
            },
        },
        post_id:{
            type:DataTypes.INTEGER,
            references:{
                module:'post',
                key:'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;