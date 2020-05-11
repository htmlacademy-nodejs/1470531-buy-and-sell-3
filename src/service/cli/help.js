'use strict';

const chalk = require(`chalk`);
const {ExitCode} = require(`../../constants`);

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
    console.info(chalk.gray(helpMessage));

    return ExitCode.success;
  }
};
