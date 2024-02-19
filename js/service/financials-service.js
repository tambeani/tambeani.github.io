// sheet-service.js

import { readJsonFile } from '../tools/read-json.js'; // Import readJsonFile function from read-json.js


// Function to read the JSON data from the file
export function readFinancial() {
    return readJsonFile() || {}; // Return an empty object if file reading fails
}

export async function addExpense(expense){
    try {
        // Read the financial data from the JSON file
        const financialData = await readJsonFile();

        // Check if the financial data exists
        if (!financialData || !financialData.financials || !financialData.financials.expenses) {
            throw new Error('Financial data structure is invalid');
        }

        // Add the new expense to the financial data
        financialData.financials.expenses.push(expense);

        // Write the updated financial data back to the file
        const writeResponse = await fetch(filePath, {
            method: 'PUT', // Use PUT method to update the file
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(financialData)
        });

        if (!writeResponse.ok) {
            throw new Error(`Failed to write JSON file: ${writeResponse.statusText}`);
        }

        console.log('Expense added successfully:', expense);
    } catch (error) {
        console.error('Error adding expense:', error);
    }}
