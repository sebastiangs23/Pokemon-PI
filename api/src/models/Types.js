//Aca ira el modelo de types
const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("types",{
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },{
      timestamps:false,
      createdAt: false,
      updatedAt: false
    })
}