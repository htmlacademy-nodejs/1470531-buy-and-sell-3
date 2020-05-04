'use strict';

const chalk = require(`chalk`);

const helpMessage = `
Программа формирует файл с данными для API.

    Гайд:
    service <command>

    Команды:
    --version               выводит номер версии
    --help                  печатает этот текст
    --generate <count>      формирует файл mocks.json
`;

module.exports = {
  name: `--help`,
  run() {
    return console.info(chalk.gray(helpMessage));
  }
};
