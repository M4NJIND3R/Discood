# Discood

## Convetr Express app to electron app

0. npm install --save-dev electron
1. transfer www.js to app.js
2. add main.js to root
3. copy the code to main.js
4. add description, author, main: 'main.js' and (inside scripts)start: 'electron .' in package.json
6.done
7. package up the app for distribution

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
