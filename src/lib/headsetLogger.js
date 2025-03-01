const logFile = require('electron-log');
const { app } = require('electron');
const debug = require('debug');

const logger = debug('headset');
const logDiscord = debug('headset:discord');
const logMedia = debug('headset:media');
const logTray = debug('headset:tray');
const logUpdate = debug('headset:update');
const logWin2Player = debug('headset:win2Player');
const logPlayer2Win = debug('headset:player2Win');

class HeadsetLogger {
  // Initializes the logger
  static init() {
    logFile.transports.console.level = false;
    logFile.transports.file.format = '{y}-{m}-{d} {h}:{i}:{s}.{ms}\t\t {text}';
    logFile.transports.file.getFile().clear(); // deletes previous logs

    // Catches any errors (useful for playwright testing)
    // might be removed once playwright implements electron logging
    logFile.catchErrors({
      showDialog: false,
      onError(error) {
        logFile.error(error);
        app.exit();
      },
    });
  }

  static info(message) {
    logger(message);
    logFile.info(`headset\t\t ${message}`);
  }

  static media(message) {
    logMedia(message);
    logFile.info(`headset:media\t\t ${message}`);
  }

  static discord(message) {
    logDiscord(message);
    logFile.info(`headset:discord\t\t ${message}`);
  }

  static tray(message) {
    logTray(message);
    logFile.info(`headset:tray\t\t ${message}`);
  }

  static update(message) {
    logUpdate(message);
    logFile.info(`headset:update\t\t ${message}`);
  }

  static win2Player(message) {
    logWin2Player('%O', message);
    if (typeof message[1] === 'object' && message[1] !== null) {
      logFile.info(`headset:win2Player\t ${message[0]}\n${JSON.stringify(message[1], null, 1)}`);
    } else {
      logFile.info(`headset:win2Player\t ${message}`);
    }
  }

  static player2Win(message) {
    logPlayer2Win('%o', message);
  }
}

module.exports = HeadsetLogger;
