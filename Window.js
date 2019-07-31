const { BrowserWindow } = require('electron');

const defaultProps = {
  width: 500,
  height: 500,
  show: false,
  webPreferences: {
    nodeIntegration: true
  },
}

class Window extends BrowserWindow {
  constructor({file, ...windowSettings}) {
    // Calls BrowserWindow with these props
    super({...defaultProps, ...windowSettings});

    this.loadFile(file);

    // this.webContents.openDevTools();


    this.once('ready-to-show', () => {
      this.show();
    })
  }
}

module.exports = Window;