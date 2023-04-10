let lastSerial = 0;
let lastUpdateTime = 0;

const generateVehicleDataWithSerial = () => {
  const currentTime = Date.now();
  if (currentTime - lastUpdateTime >= 15000) {
    lastSerial += 1;
    lastUpdateTime = currentTime;
  }
  const serial = `Serial${lastSerial}`;
  const currentISOTime = new Date(currentTime).toISOString();

  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';
  let result = '';

  for (let i = 0; i < 3; i++) {
    result += letras.charAt(Math.floor(Math.random() * letras.length));
  }

  result += '-';

  for (let i = 0; i < 4; i++) {
    result += numeros.charAt(Math.floor(Math.random() * numeros.length));
  }

  const identificacao = result;

  return {
    usuarioAdaptorWS: {
      serial,
      situacao_cadastro: 1,
      situacao_movimento: 1,
      identificacao,
      modelo: "Carro",
      tipoVeiculoAdaptor: {
        nome: "Carro"
      },
      grupoAdaptor: {
        nome: "Grupo A"
      },
      ultimoRegistro: {
        velocidade: 50,
        latitude: -23.550520,
        longitude: -46.633308,
        data: currentISOTime,
        data_milisec: currentTime,
        ignicao: 1,
        data_server: currentISOTime
      }
    }
  };
};

module.exports = {
  generateDataWithSerial: function (userContext, events, done) {
    const generatedData = generateVehicleDataWithSerial();
    userContext.vars.generatedData = generatedData;
    return done();
  },
};
