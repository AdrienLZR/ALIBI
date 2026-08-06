const { app, BrowserWindow, shell, session } = require('electron');
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

  win.webContents.setWindowOpenHandler(function (details) {
    if (details.url.indexOf('#spectateur') !== -1) {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          width: 1280,
          height: 800,
          title: 'ALIBI — Spectateur',
          icon: path.join(__dirname, 'logoiconfinal-rounded.ico'),
          backgroundColor: '#0a0e16',
          autoHideMenuBar: true,
        }
      };
    }
    shell.openExternal(details.url);
    return { action: 'deny' };
  });
  win.webContents.on('did-create-window', function (childWin) {
    childWin.maximize();
  });
}

app.whenReady().then(function () {
  /* Autoriser l'accès micro/caméra sans popup (appli locale) */
  session.defaultSession.setPermissionRequestHandler(function (webContents, permission, callback) {
    callback(true);
  });
  session.defaultSession.setPermissionCheckHandler(function () {
    return true;
  });

  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  app.quit();
});
