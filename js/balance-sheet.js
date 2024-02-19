// balance-sheet.js

// Import the functions from sheet-service.js
import { readBalanceSheet, addAsset, updateAsset, deleteAsset } from './service/sheet-service.js';

// Execute code when the DOM content is loaded
document.addEventListener("DOMContentLoaded", async () => {

    if (!window.location.href.includes("balance-sheet.html")) 
        return;
    const balanceSheet = await readBalanceSheet();
    renderBalanceSheet(balanceSheet);
});

const renderBalanceSheet = (balanceSheet) => {
    const container = document.getElementById("root");
    renderAssets(balanceSheet.assets, container);
}

const renderHeading = (text) => {
    const header = document.createElement('h2');
    header.textContent = text; 
    header.classList.add("text-white");
    header.classList.add("bg-dark");
    header.classList.add("p-2");
    return header;
}

const renderBaseTable = () => {
    const table = document.createElement('table');
    table.classList.add('table'); // Add class to the table element
    table.classList.add('table-sm'); // Add class to the table element
    return table;
}

const renderValues = (asset, year) => {
        // Check if the asset has values
        if (asset.values && Array.isArray(asset.values)) {
            // Find the value for the given year
            const valueForYear = asset.values.find(value => value.year === year);
            // Return the value if found, otherwise return an empty cell
            return valueForYear ? `<td>${valueForYear.amount}</td>` : '<td></td>';
        } else {
            // Return an empty cell if values array is not present or not an array
            return '<td>-</td>';
        }
}

const renderAssets = (assets, container) => {
    const header = renderHeading("Assets");
    const table = renderBaseTable();

    table.innerHTML = `
        <thead>
            <th></th>
            <th>2023</th>
            <th>2024</th>
        </thead>
        <tbody>
            ${assets.current.map(asset => `
                <tr>
                    <td>${asset.name}</td>
                    ${renderValues(asset, 2023)}
                    ${renderValues(asset, 2024)}
                </tr>
            `).join('')}
        </tbody>
    `;

    appendToContainer([header, table],container);
}

const appendToContainer = (elements, container) => {
    elements.map( element => container.appendChild(element));
}
