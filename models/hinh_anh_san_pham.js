const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HINH_ANH_SAN_PHAM', {
    MaHinhAnh: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MaSanPham: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'SAN_PHAM',
        key: 'MaSanPham'
      }
    },
    HinhAnh: {
      type: DataTypes.CHAR(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'HINH_ANH_SAN_PHAM',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaHinhAnh" },
        ]
      },
      {
        name: "FK_HINH_ANH_SAN_PHAM_MASANPHAM",
        using: "BTREE",
        fields: [
          { name: "MaSanPham" },
        ]
      },
    ]
  });
};
