const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;

let mainWindow = null;
const forward = (channel) => (data) =>
  mainWindow?.webContents.send('updater:' + channel, data);

autoUpdater.on('checking-for-update', () => forward('checking')());
autoUpdater.on('update-available', forward('available'));
autoUpdater.on('update-not-available', forward('not-available'));
autoUpdater.on('download-progress', forward('progress'));
autoUpdater.on('update-downloaded', forward('downloaded'));
autoUpdater.on('error', (err) => forward('error')({ message: err.message }));

ipcMain.handle('kinlore:get-version', () => app.getVersion());
ipcMain.handle('updater:check', async () => {
  if (!app.isPackaged) return { status: 'dev-mode' };
  return autoUpdater.checkForUpdates();
});
ipcMain.handle('updater:download', () => autoUpdater.downloadUpdate());
ipcMain.handle('updater:install', () => autoUpdater.quitAndInstall(true, true));

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: 'Kinlore',
    backgroundColor: '#f4ead5',
    icon: path.join(__dirname, 'assets', 'kinlore.ico'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  Menu.setApplicationMenu(null);
  mainWindow.loadFile(path.join(__dirname, 'kinlore.html'));
  mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
