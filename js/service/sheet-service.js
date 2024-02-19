// sheet-service.js

import { readJsonFile } from '../tools/read-json.js'; // Import readJsonFile function from read-json.js

// Function to read the JSON data from the file
export function readBalanceSheet() {
    return readJsonFile() || {}; // Return an empty object if file reading fails
}

// Function to write the JSON data to the file
function writeBalanceSheet(data) {
    try {
        // Convert the data to JSON string
        const jsonData = JSON.stringify(data, null, 4);

        // Use localStorage or IndexedDB to store the JSON data in the browser
        localStorage.setItem('balanceSheetData', jsonData);

        console.log('Balance sheet updated successfully.');
    } catch (error) {
        console.error('Error writing balance sheet:', error);
    }
}

// Function to add a new asset
export function addAsset(asset) {
    const balanceSheet = readBalanceSheet();
    if (!balanceSheet.assets) {
        balanceSheet.assets = { current: [], fixed: [], other: [] };
    }
    balanceSheet.assets.current.push(asset);
    writeBalanceSheet(balanceSheet);
}

// Function to update an existing asset
export function updateAsset(assetName, newData) {
    const balanceSheet = readBalanceSheet();
    if (balanceSheet.assets) {
        const assetIndex = balanceSheet.assets.current.findIndex(asset => asset.name === assetName);
        if (assetIndex !== -1) {
            balanceSheet.assets.current[assetIndex] = { ...balanceSheet.assets.current[assetIndex], ...newData };
            writeBalanceSheet(balanceSheet);
            console.log(`${assetName} updated successfully.`);
        } else {
            console.error(`${assetName} not found.`);
        }
    } else {
        console.error('Assets section not found in the balance sheet.');
    }
}

// Function to delete an asset
export function deleteAsset(assetName) {
    const balanceSheet = readBalanceSheet();
    if (balanceSheet.assets) {
        balanceSheet.assets.current = balanceSheet.assets.current.filter(asset => asset.name !== assetName);
        writeBalanceSheet(balanceSheet);
        console.log(`${assetName} deleted successfully.`);
    } else {
        console.error('Assets section not found in the balance sheet.');
    }
}
