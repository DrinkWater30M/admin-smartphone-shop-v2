const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('GIO_YEU_THICH', {
    MaKhachHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'KHACH_HANNG',
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
    }
  }, {
    sequelize,
    tableName: 'GIO_YEU_THICH',
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
        name: "FK_GIO_YEU_THICH_SANPHAM",
        using: "BTREE",
        fields: [
          { name: "MaSanPham" },
          { name: "LoaiSanPham" },
        ]
      },
    ]
  });
};
