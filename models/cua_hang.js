const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CUA_HANG', {
    MaCuaHang: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenCuaHang: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DiaChiCuaHang: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SoDienThoai: {
      type: DataTypes.CHAR(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CUA_HANG',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaCuaHang" },
        ]
      },
    ]
  });
};
