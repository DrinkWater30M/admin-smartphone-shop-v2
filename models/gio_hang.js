const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('GIO_HANG', {
    MaKhachHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'KHACH_HANG',
        key: 'MaKhachHang'
      }
    },
    MaSanPham: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'LOAI_SAN_PHAM',
        key: 'MaSanPham'
      }
    },
    LoaiSanPham: {
      type: DataTypes.CHAR(25),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'LOAI_SAN_PHAM',
        key: 'LoaiSanPham'
      }
    },
    SoLuongMua: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'GIO_HANG',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaKhachHang" },
          { name: "MaSanPham" },
          { name: "LoaiSanPham" },
        ]
      },
      {
        name: "FK_GIO_HANG_SANPHAM",
        using: "BTREE",
        fields: [
          { name: "MaSanPham" },
          { name: "LoaiSanPham" },
        ]
      },
    ]
  });
};
