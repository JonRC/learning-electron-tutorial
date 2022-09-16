const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");
const path = require("path");

const createWindow = () => {
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      devTools: true,
    },
  });

  browserWindow.title = "Hello World from Electron";

  ipcMain.handle("ping", async () => {
    await wait(500);
    return "pong";
  });

  ipcMain.on("setTitle", (event, title) => {
    console.log("setTitleHandler");
    const webContents = event.sender;
    const window = BrowserWindow.fromWebContents(webContents);
    window?.setTitle(title);
  });

  ipcMain.handle("getFile", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog();
    if (canceled) {
      console.log("fdasjklfdjsa");
      throw {
        message: "this is a message error",
        test: "kkkkkkkkkkk",
      };
    }

    return filePaths[0];
  });

  const menu = Menu.buildFromTemplate([
    {
      label: "bora birl",
      submenu: [
        {
          click: () => browserWindow.webContents.send("update-counter", 1),
          label: "Increment",
          sublabel: "this is a sublabel",
        },
        {
          click: () => browserWindow.webContents.send("update-counter", -1),
          label: "Decrement",
          sublabel: "this is another sublabel",
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);

  browserWindow.loadFile("index.html");
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
