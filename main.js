const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'ALIBI',
    icon: path.join(__dirname, 'logoiconfinal-rounded.ico'),
    backgroundColor: '#0a0e16',
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  win.loadFile('JEUX_ALIBI_V4.html');

  win.once('ready-to-show', function () {
    win.maximize();
    win.show();
  });

  /* Liens externes (si jamais) s'ouvrent dans le vrai navigateur */
  win.webContents.setWindowOpenHandler(function (details) {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });
}

app.whenReady().then(function () {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  app.quit();
});
