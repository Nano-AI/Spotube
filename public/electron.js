const path = require("path");

const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const usetube = require("usetube");
const ytMusic = require("node-youtube-music");
const { screen } = require("electron");
const RPC = require("discord-rpc");
const Store = require("electron-store");

const clientId = "925459367380271134";
const scopes = ["rpc", "rpc.api", "messages.read"];

var store = new Store();

var discord = false;

const client = new RPC.Client({ transport: "ipc" });

var ready = false;

var type = (function (global) {
  var cache = {};
  return function (obj) {
    var key;
    return obj === null
      ? "null" // null
      : obj === global
      ? "global" // window in browser or global in nodejs
      : (key = typeof obj) !== "object"
      ? key // basic: string, boolean, number, undefined, function
      : obj.nodeType
      ? "object" // DOM element
      : cache[(key = {}.toString.call(obj))] || // cached. date, regexp, error, object, array, math
        (cache[key] = key.slice(8, -1).toLowerCase()); // get XXXX from [object XXXX], and cache it
  };
})(this);

client.on("ready", () => {
  ready = true;
});

client.login({ clientId }).catch(console.error);

var searchSongOnly = true;

const secondsToHMS = (duration) => {
  if (!duration) return;
  let seconds = duration;
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = Math.floor(seconds - hours * 3600 - minutes * 60);
  var time = "";
  if (hours) {
    time += (hours < 10 ? "0" : "") + hours + ":";
  }
  if (minutes) {
    time += (hours != 0 && hours < 10 ? "0" : "") + minutes + ":";
  } else {
    time += "00:";
  }
  time += (seconds < 10 ? "0" : "") + seconds;
  return time;
};

function parseVideoToSong(video) {
  return video.videos.map((video) => {
    return {
      album: undefined,
      artists: [{ name: video.artist, id: undefined }],
      duration: {
        totalSeconds: video.duration,
        label: secondsToHMS(video.duration),
      },
      isExplicit: undefined,
      thumbnailUrl: `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`,
      title: video.title,
      youtubeId: video.id,
    };
  });
}

ipcMain.on("search", async (event, arg) => {
  console.log("Searching for " + arg);
  const results = searchSongOnly
    ? await ytMusic.searchMusics(arg).catch((err) => console.error(err))
    : parseVideoToSong(
        await usetube.searchVideo(arg).catch((err) => console.error(err))
      );
  event.reply("search-results", results);
});

ipcMain.on("minimize", (event, arg) => {
  BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on("toggle-fullscreen", (event, arg) => {
  const winBound = BrowserWindow.getFocusedWindow().getBounds();
  const whichScreen = screen.getDisplayNearestPoint({
    x: winBound.x,
    y: winBound.y,
  });
  const { width, height } = whichScreen.workAreaSize;
  const bounds = BrowserWindow.getFocusedWindow().getBounds();
  const windowWidth = bounds.width;
  const windowHeight = bounds.height;
  if (width == windowWidth && height == windowHeight) {
    BrowserWindow.getFocusedWindow().unmaximize();
  } else {
    BrowserWindow.getFocusedWindow().maximize();
  }
});

ipcMain.on("close", (event, arg) => {
  BrowserWindow.getFocusedWindow().close();
});

ipcMain.on("rich-presence", (event, args) => {
  if (!ready || !discord) return;
  console.log(`Adding ${args.title} by ${args.artists}`);
  let t = new Date();
  t.setSeconds(t.getSeconds() + args.songDuration);
  client.setActivity({
    details: `${args.title}`,
    state: args.artists ? `By ${args.artists}` : "",
    startTimestamp: new Date(),
    endTimestamp: t,
    // I mispelt it on accident and i'm too lazy to change it
    largeImageKey: "deafult",
    smallImageKey: "small-default",
    smallImageText: `${secondsToHMS(args.songDuration)} long`,
    largeImageText: `"${args.title}" ${
      args.artsits ? "- " + args.artists : ""
    }`,
  });
});

/*
Playlist Format:
{
  playlistId: "",
  songs: [
    Array of SongObj's
  ],
  playlistTitle: "",
  playlistDescription: "",
  thumbnail: ""
}
*/

// Creates playlist with an ID
// Just takes in ID
ipcMain.on("create-playlist", (event, arg) => {
  console.log("Creating playlist with ID " + arg);
  let p = store.get("playlists");
  console.log(p);
  if (type(p) != "array") {
    console.error("Error: Playlist is not an array");
    store.set("playlists", []);
    return;
  }
  if (p.includes(arg)) return;
  p.push(arg);
  store.set("playlists", p);
  store.set(arg, {
    playlistId: arg,
    songs: [],
    playlistTitle: "Unnamed Playlist",
    playlistDescription: "A playlist created by deafult",
    thumbnail: "",
  });
});

// Returs playlist data depdning on the ID
// Just takes in ID
ipcMain.on("get-playlist", (event, arg) => {
  if (!store.get("playlists").includes(arg)) {
    console.log("Playlist " + arg + " not found");
    return null;
  }
  event.reply("playlist", store.get(arg));
});

// Add song to a playlist
// Takes in playlist ID and song object
ipcMain.on("add-song", (event, arg) => {
  console.log("Adding song to playlist " + arg.songObj.title);
  let p = store.get(arg.playlistId);
  p.songs.push(arg.songObj);
  store.set(arg.playlistId, p);
});

ipcMain.on("get-playlist-ids", (event, arg) => {
  event.reply("playlist-ids", store.get("playlists"));
});

ipcMain.on("get-playlists", (event, arg) => {
  let playlists = store.get("playlists");
  if (!playlists) return store.set("playlists", []);
  let playlistsObj = [];
  playlists.forEach((playlist) => {
    console.log(playlist);
    playlistsObj.push(store.get(playlist));
  });
  event.reply("playlists", playlistsObj);
});

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1600,
    height: 850,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // enableRemo: true,
      webSecurity: false,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  rpc.clearActivity();
  rpc.destroy();
  rpc = null;
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
