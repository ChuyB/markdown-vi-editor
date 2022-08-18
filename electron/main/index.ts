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

  const openFileOnLoad = async () => {
    const openFileRegex = new RegExp("^(.+\\\\)*(.+)\\.(.+)$", "g");
    const openFileGroups = openFileRegex.exec(process.argv[1]);
    const openFileExtension = openFileGroups ? openFileGroups[3] : "";
    if (openFileExtension == "md") {
      const openFilePath = openFileGroups[0];
      const content = await openFile(openFilePath);
      if (content) {
        win?.webContents.send("openFile", content);
      }
    }
  };

  // Opens file on load if the app is started using a file
  win.webContents.on("did-finish-load", () => {
    openFileOnLoad();
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

  ipcMain.on("saveFile", (event, path: string | number, data: string) => {
    if (path !== undefined) {
      fs.writeFileSync(path, data);
      if (typeof path !== "number") openFile(path);
    }
  });
}

const currentFile = { path: undefined, name: undefined, fd: undefined };

// Handles native dialog windows for opening and saving files
const openFile = async (path: string = undefined) => {
  let isCanceled = false;
  if (path === undefined) {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: "Select a file",
      buttonLabel: "Open",
      properties: ["openFile"],
      filters: [{ name: "Markdown", extensions: ["md", "txt"] }],
    });
    path = filePaths[0];
    isCanceled = canceled;
  }

  if (!isCanceled) {
    const fileNameRegex = new RegExp("^(.+\\\\)*(.+)\\.(.+)$", "g");
    const fileNameGroups = fileNameRegex.exec(path);
    const fileDescriptor = await fs.openSync(path, "r+");
    currentFile.path = path;
    currentFile.name = fileNameGroups[2];
    currentFile.fd = fileDescriptor;

    win.title = `Markdown Editor - ${currentFile.name}`;
    const content = fs.readFileSync(currentFile.fd, { encoding: "utf-8" });
    return content;
  }
};

const getSaveFilePath = async (options = { openDialog: false }) => {
  if (currentFile.fd === undefined || options.openDialog) {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "Save File As",
      buttonLabel: "Save",
      filters: [{ name: "Markdown", extensions: ["md", "txt"] }],
    });
    if (!canceled) {
      return filePath;
    }
  } else {
    return currentFile.fd;
  }
};

const menu = new Menu();
menu.append(
  new MenuItem({
    label: "File",
    submenu: [
      {
        label: "Open File",
        accelerator: "CmdOrCtrl+O",
        click: async () => {
          const content = await openFile();
          if (content) {
            win.webContents.send("openFile", content);
          }
        },
      },
      {
        label: "Save File",
        accelerator: "CmdOrCtrl+S",
        click: async () => {
          win.webContents.send("getSaveFilePath", await getSaveFilePath());
        },
      },
      {
        label: "Save File As",
        accelerator: "CmdOrCtrl+Shift+S",
        click: async () => {
          win.webContents.send(
            "getSaveFilePath",
            await getSaveFilePath({ openDialog: true })
          );
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
  if (currentFile.fd !== undefined) fs.close(currentFile.fd);
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
  }
});
