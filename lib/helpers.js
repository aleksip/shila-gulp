const fs = require('fs');
const yaml = require('js-yaml');

function loadConfig() {
  let config;
  try {
    config = yaml.safeLoad(
      fs.readFileSync('./shila-gulp-config.yml', 'utf8'));
  }
  catch (e) {
    config = {};
  }
  return config;
}

function isDirectory(dir) {
  try {
    return fs.statSync(dir).isDirectory();
  }
  catch (err) {
    return false;
  }
}

module.exports.loadConfig = loadConfig;
module.exports.isDirectory = isDirectory;
