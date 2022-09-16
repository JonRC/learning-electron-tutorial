const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
});

contextBridge.exposeInMainWorld("api", {
  setTitle: (title) => ipcRenderer.send("setTitle", title),
  getFile: () => ipcRenderer.invoke("getFile"),
  onCounterUpdate: (callback) => ipcRenderer.on("update-counter", callback),
});

console.log("preload");
