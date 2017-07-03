const electron = require("electron");
const path = require('path');
const url = require('url');


var window = null

electron.app.on("window-all-closed", () => {
  electron.app.quit();
});
// Wait until the app is ready
electron.app.once('ready', function () {
  electron.session.defaultSession && electron.session.defaultSession.clearCache(() => { });

  // Create a new window
  window = new electron.BrowserWindow({
    // Set the initial width to 500px
    width: 1024,
    // Set the initial height to 400px
    height: 680,
    // Set the default background color of the window to match the CSS
    // background color of the page, this prevents any white flickering
    backgroundColor: "#EEE",
    // Don't show the window until it ready, this prevents any white flickering
    show: false
  })

  window.loadURL(url.format({
    pathname: path.join(__dirname, 'src', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  installMenu();
  // window.webContents.openDevTools();

  // Show window when page is ready
  window.once('ready-to-show', function () {
    window.show()
  })
})

function installMenu() {
  const template = [
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        { role: "selectall" }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "toggledevtools" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    {
      role: "window",
      submenu: [
        { role: "minimize" },
        { role: "close" }
      ]
    }
  ];

  if (process.platform === "darwin") {
    template.unshift({
      label: electron.app.getName(),
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services", submenu: [] },
        { type: "separator" },
        { role: "hide" },
        { role: "hideothers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" }
      ]
    });
    // Edit menu.
    template[1].submenu.push(
      { type: "separator" },
      {
        label: "Speech", submenu: [
          { role: "startspeaking" },
          { role: "stopspeaking" }
        ]
      }
    );
    // Window menu.
    template[3].submenu = [
      { label: "Close", accelerator: "CmdOrCtrl+W", role: "close" },
      { label: "Minimize", accelerator: "CmdOrCtrl+M", role: "minimize" },
      { label: "Zoom", role: "zoom" },
      { type: "separator" },
      { label: "Bring All to Front", role: "front" }
    ];
  }

  const menu = electron.Menu.buildFromTemplate(template);
  electron.Menu.setApplicationMenu(menu);
}