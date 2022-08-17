import { BrowserWindow, dialog, Menu, MenuItem, nativeTheme } from "electron";
//import { BrowserWindow as AcrylicWindow } from "electron-acrylic-window";
import { app, shell, ipcMain } from "electron";
import { release } from "os";
import { join } from "path";
import fs from "fs";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, "../.."),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? "../.." : "../../../public"),
};

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;
const indexHtml = join(ROOT_PATH.dist, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "Markdown Editor",
    icon: join(ROOT_PATH.public, "favicon.svg"),
    autoHideMenuBar: true,
    width: 980,
    height: 700,
    webPreferences: {
      preload,
      nodeIntegration: true,
    },
  });

  if (app.isPackaged) {
    win.loadFile(indexHtml);
  } else {
    win.loadURL(url);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (event, url) => {
    if (url.startsWith("https:") || url.startsWith("http:")) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  ipcMain.handle("dark-mode:get", () => {
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle("dark-mode:set", (event, theme: "light" | "dark") => {
    nativeTheme.themeSource = theme;
  });
}

// Handles native dialog windows
const openFile = async () => {
  const { filePaths } = await dialog.showOpenDialog({
    title: "Select a file",
    buttonLabel: "Open",
    properties: ["openFile"],
    filters: [{ name: "Markdown", extensions: ["txt", "md"] }],
  });
  const rawContent = fs.readFileSync(filePaths[0], { encoding: "utf-8" });
  return rawContent;
};
const menu = new Menu();
menu.append(
  new MenuItem({
    label: "File",
    submenu: [
      {
        label: "Open file",
        accelerator: "CmdOrCtrl+O",
        click: async () => {
          win.webContents.send("openFile", await openFile());
        },
      },
    ],
  })
);
menu.append(
  new MenuItem({
    label: "View",
    role: "viewMenu",
  })
);

Menu.setApplicationMenu(menu);

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// new window example arg: new windows url
ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg });
  } else {
    childWindow.loadURL(`${url}/#${arg}`);
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
});
