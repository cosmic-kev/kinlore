const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('kinlore', {
  isElectron: true,
  getVersion: () => ipcRenderer.invoke('kinlore:get-version'),
  updater: {
    check: () => ipcRenderer.invoke('updater:check'),
    download: () => ipcRenderer.invoke('updater:download'),
    install: () => ipcRenderer.invoke('updater:install'),
    on: (callback) => {
      const channels = ['checking', 'available', 'not-available', 'progress', 'downloaded', 'error'];
      channels.forEach(ch =>
        ipcRenderer.on('updater:' + ch, (_e, data) => callback(ch, data))
      );
    }
  }
});
