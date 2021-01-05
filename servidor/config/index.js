const ambiente = process.env.NODE_ENV || 'development';

const configuraciónBase = {
  jwt: {},
  puerto: process.env.PORT || 3000,
  suprimirLogs: false,
  S3:{
		accessKeyId: process.env.S3_ACCESS_KEY_ID,
		secretAccessKey: process.env.S3_SECRET_KEY,
  },
  s3BucketName: 'pueba-api-node', 
  guardarImagenesEnS3: true
};

let configuraciónDeAmbiente = {};

switch (ambiente) {
  case 'desarrollo':
  case 'dev':
  case 'development':
    configuraciónDeAmbiente = require('./dev');
    break;
  case 'producción':
  case 'production':
  case 'prod':
    configuraciónDeAmbiente = require('./prod');
    break;
  case 'test':
    configuraciónDeAmbiente = require('./test');
    break;
  default:
    configuraciónDeAmbiente = require('./dev');
}

module.exports = {
  ...configuraciónBase,
  ...configuraciónDeAmbiente
};
