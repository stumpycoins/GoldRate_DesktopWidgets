# GoldRate_DesktopWidgets-
Fetch the Chennai gold rate from https://www.livechennai.com/gold_silverrate.asp website and added in desktop widgets

Method 1: Using Electron Packager
This is a simple method to create an .exe file.

Step 1: Install Electron Packager
Run this command in your terminal: "npm install -g electron-packager"

Step 2: Package the App
Navigate to your project folder and run: "electron-packager . GoldRateWidget --platform=win32 --arch=x64 --out=dist --overwrite"

GoldRateWidget → Name of your app
--platform=win32 → Builds for Windows
--arch=x64 → Builds for 64-bit systems
--out=dist → Saves the .exe file inside the dist folder
--overwrite → Replaces old builds

Your .exe file will be inside the dist/GoldRateWidget-win32-x64/ folder.
