// models/vehicleDataModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VehicleData = sequelize.define('vehicledata', {
  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  serial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  situacao_cadastro: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  situacao_movimento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  identificacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoVeiculoAdaptorNome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grupoAdaptorNome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ultimoRegistroVelocidade: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ultimoRegistroLatitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ultimoRegistroLongitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ultimoRegistroData: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ultimoRegistroDataMilisec: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  ultimoRegistroIgnicao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ultimoRegistroDataServer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = VehicleData;
