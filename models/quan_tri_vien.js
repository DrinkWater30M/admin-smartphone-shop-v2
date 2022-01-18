const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('QUAN_TRI_VIEN', {
    MaAdmin: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenNguoiSuDung: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TenDangNhap: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    MatKhau: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'QUAN_TRI_VIEN',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaAdmin" },
        ]
      },
    ]
  });
};
