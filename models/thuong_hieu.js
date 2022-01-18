const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('THUONG_HIEU', {
    MaThuongHieu: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    ThuongHieu: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'THUONG_HIEU',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaThuongHieu" },
        ]
      },
    ]
  });
};
