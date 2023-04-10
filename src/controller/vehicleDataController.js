// controllers/vehicleDataController.js
const VehicleData = require('../models/vehicleDataModel');

const filterVehicleData = (data) => {
  return {
    serial: data.usuarioAdaptorWS.serial,
    situacao_cadastro: data.usuarioAdaptorWS.situacao_cadastro,
    situacao_movimento: data.usuarioAdaptorWS.situacao_movimento,
    identificacao: data.usuarioAdaptorWS.identificacao,
    modelo: data.usuarioAdaptorWS.modelo,
    tipoVeiculoAdaptorNome: data.usuarioAdaptorWS.tipoVeiculoAdaptor.nome,
    grupoAdaptorNome: data.usuarioAdaptorWS.grupoAdaptor.nome,
    ultimoRegistroVelocidade: data.usuarioAdaptorWS.ultimoRegistro.velocidade,
    ultimoRegistroLatitude: data.usuarioAdaptorWS.ultimoRegistro.latitude,
    ultimoRegistroLongitude: data.usuarioAdaptorWS.ultimoRegistro.longitude,
    ultimoRegistroData: data.usuarioAdaptorWS.ultimoRegistro.data,
    ultimoRegistroDataMilisec: data.usuarioAdaptorWS.ultimoRegistro.data_milisec,
    ultimoRegistroIgnicao: data.usuarioAdaptorWS.ultimoRegistro.ignicao,
    ultimoRegistroDataServer: data.usuarioAdaptorWS.ultimoRegistro.data_server,
  };
};


const groupByIdentificacao = (dataList) => {
  const groups = dataList.reduce((acc, data) => {
    const key = data.identificacao;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(data);
    return acc;
  }, {});

  return groups;
};

const getLatestRecordByMilisec = (groupedData) => {
  const latestRecords = [];

  for (const key in groupedData) {
    if (Object.hasOwnProperty.call(groupedData, key)) {
      const group = groupedData[key];
      const latestRecord = group.reduce((latest, record) => {
        return (!latest || record.ultimoRegistroDataMilisec > latest.ultimoRegistroDataMilisec) ? record : latest;
      }, null);
      latestRecords.push(latestRecord);
    }
  }

  return latestRecords;
};
const processDataAndSave = async (latestRecords) => {
  for (const record of latestRecords) {
    const existingRecord = await VehicleData.findOne({
      where: {
        identificacao: record.identificacao,
        ultimoRegistroDataMilisec: record.ultimoRegistroDataMilisec,
      },
    });

    if (!existingRecord) {
      await VehicleData.create(record);
    }
  }
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.receiveAndFilterVehicleData = async (req, res) => {
  try {
    const rawData = req.body;
    console.log('Dados recebidos:', rawData);

    const filteredData = filterVehicleData(rawData);
    console.log('Dados filtrados:', filteredData);

    const groupedData = groupByIdentificacao([filteredData]);
    const latestRecords = getLatestRecordByMilisec(groupedData);

    req.app.get('io').emit('filteredData', latestRecords);

    await wait(15000);
    await processDataAndSave(latestRecords);

    res.status(200).json(latestRecords);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Erro ao processar os dados do veículo', error });
  }
};
