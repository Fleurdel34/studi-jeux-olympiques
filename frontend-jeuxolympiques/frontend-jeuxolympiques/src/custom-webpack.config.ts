import { EnvironmentPlugin } from 'webpack';
const Dotenv = require('dotenv-webpack');
module.exports = {
  plugins: [new Dotenv()],
  devServer:{
    allowedHosts:['all'],
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  }
};
