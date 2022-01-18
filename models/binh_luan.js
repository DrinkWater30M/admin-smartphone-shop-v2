const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BINH_LUAN', {
    MaBinhLuan: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MaSanPham: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SAN_PHAM',
        key: 'MaSanPham'
      }
    },
    MaKhachHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'KHACH_HANG',
        key: 'MaKhachHang'
      }
    },
    DanhGia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    NoiDung: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ThoiGian: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'BINH_LUAN',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaBinhLuan" },
        ]
      },
      {
        name: "FK_BINH_LUAN_MASANPHAM",
        using: "BTREE",
        fields: [
          { name: "MaSanPham" },
        ]
      },
      {
        name: "FK_BINH_LUAN_MAKHACHHANG",
        using: "BTREE",
        fields: [
          { name: "MaKhachHang" },
        ]
      },
    ]
  });
};
