const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

let mainWindow;

app.whenReady().then(() => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: 300, 
        height: 50, 
        x: width - 310, 
        y: height - 60, 
        frame: false, 
        transparent: true, 
        resizable: false, 
        alwaysOnTop: false, 
        skipTaskbar: true, 
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.setIgnoreMouseEvents(true, { forward: true });
    mainWindow.setAlwaysOnTop(false, "screen-saver");

    mainWindow.loadFile('index.html');
});

ipcMain.handle('fetch-gold-rates', async () => {
    try {
        const URL = 'https://www.livechennai.com/gold_silverrate.asp';
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        let goldRates = [];

        $('table.table-bordered.table-striped.gold-rates').each((index, table) => {
            let headers = [];
            $(table).find('thead th').each((i, th) => {
                headers.push($(th).text().trim());
            });

            $(table).find('tbody tr').each((i, tr) => {
                let rowData = {};
                if (i < 2) {
                    $(tr).find('td').each((j, td) => {
                        rowData[headers[j]] = $(td).text().trim();
                    });
                    goldRates.push(rowData);
                }
            });
        });

        return [
            {
                gold: "24K",
                Price: goldRates[0]["Pure Gold (24 k)"],
                Change: parseInt(goldRates[0]["Pure Gold (24 k)"].replace(/,/g, ''), 10) - 
                        parseInt(goldRates[1]["Pure Gold (24 k)"].replace(/,/g, ''), 10)
            },
            {
                gold: "22K",
                Price: goldRates[0]["1 Gm"],
                Change: parseInt(goldRates[0]["1 Gm"].replace(/,/g, ''), 10) - 
                        parseInt(goldRates[1]["1 Gm"].replace(/,/g, ''), 10)
            }
        ];
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
