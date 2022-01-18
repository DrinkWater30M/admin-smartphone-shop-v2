const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SAN_PHAM', {
    MaSanPham: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenSanPham: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    MaThuongHieu: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: 'THUONG_HIEU',
        key: 'MaThuongHieu'
      }
    },
    MoTa: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_del: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'SAN_PHAM',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaSanPham" },
        ]
      },
      {
        name: "FK_SAN_PHAM_MATHUONGHIEU",
        using: "BTREE",
        fields: [
          { name: "MaThuongHieu" },
        ]
      },
    ]
  });
};
