const { contextBridge } = require('electron');

// Expose a minimal, safe API if needed in future
contextBridge.exposeInMainWorld('cosmic', {
  version: '1.0.0',
});
