# Discood

## Convetr Express app to electron app

0. npm install --save-dev electron
1. transfer www.js to app.js
2. add main.js to root
3. create window for your app in main.js
		
		const { app, BrowserWindow } = require("electron");
		//our exppress app
		const server = require("./app");

		let mainWindow;
		
		//initialising our main window and its properties
		function createWindow() {
		  mainWindow = new BrowserWindow({
		    width: 1132,
		    height: 968,
		    webPreferences: {
		      nodeIntegration: true,
		    },
		    //unchangable size
		    resizable: false
		  });
		
		  //what to load on start in window
		  mainWindow.loadURL("http://localhost:3000");
		  mainWindow.on("closed", function () {
		    mainWindow = null;
		  });
		}

		//similar to routes in express, we can triger functions 
		app.on("ready", createWindow);

		app.on("window-all-closed", function () {
		  if (process.platform !== "darwin") {
		    app.quit();
		  }
		});

		app.on("activate", function () {
		  if (mainWindow === null) {
		    createWindow();
		  }
		});

4. add description, author, main: 'main.js' and (inside scripts)start: 'electron .' in package.json
5.done
6. package up the app for distribution

		npm install --save-dev @electron-forge/cli
		npm electron-forge import

		✔ Checking your system
		✔ Initializing Git Repository
		✔ Writing modified package.json file
		✔ Installing dependencies
		✔ Writing modified package.json file
		✔ Fixing .gitignore

		We have ATTEMPTED to convert your app to be in a format that electron-forge understands.

		Thanks for using "electron-forge"!!!
		npm run make

for menu bar, i recommend: https://dev.to/saisandeepvaddi/creating-a-custom-menu-bar-in-electron-1pi3
