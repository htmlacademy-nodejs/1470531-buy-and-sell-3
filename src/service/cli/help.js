'use strict';

const {ExitCode} = require(`../../constants`);
const {logger} = require(`../../utils`);

const helpMessage = `
Программа формирует файл с данными для API.

    Гайд:
    service <command>

    Команды:
    --version               выводит номер версии
    --help                  печатает этот текст
    --generate <count>      формирует файл mocks.json
    --server <port>         запускает сервер на выбранном порту
`;

module.exports = {
  name: `--help`,
  run() {
    logger.data(helpMessage);

    return ExitCode.success;
  }
};
