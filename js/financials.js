// balance-sheet.js

// Import the functions from sheet-service.js
import { readFinancial, addExpense } from './service/financials-service.js';
import { renderHeading, renderNote, renderBaseTable, appendToContainer } from './tools/render-elements.js';

// Execute code when the DOM content is loaded
document.addEventListener("DOMContentLoaded", async () => {
    if (!window.location.href.includes("financials.html")) 
        return;

    const expenseAdd = document.getElementById("expense-add");
    expenseAdd.addEventListener('click', () => submitExpenseForm());

    const finacials = await readFinancial();
    renderFinancials(finacials.financials);
});

const renderFinancials = (financials) => {
    const container = document.getElementById("root");
    const summary = renderHeading("Summary");
    const note = renderNote("This Month: February");
    const summaryTable = renderSummaryTable(renderBaseTable(), financials.expenses);
    const allExpenses = renderHeading("All Expenses");
    const expensesTable = renderExpensesTable(renderBaseTable(), financials.expenses);

    appendToContainer([summary, note, summaryTable, allExpenses, expensesTable],container);
}

const renderSummaryTable = (expensesTable, expenses) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Get the current month (0-indexed)

    // Create an object to store total expenses for each category
    const categoryTotals = {};

    expenses.forEach(expense => {
        // Filter entries for the current month
        const currentMonthEntries = (expense.entries || []).filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate.getMonth() === currentMonth; // Check if entry date is in the current month
        });

        // Skip rendering if there are no entries for the current month
        if (currentMonthEntries.length === 0) {
            return;
        }

        // Insert cells for Type and value
        const typeCell = expensesTable.insertRow().insertCell();
        typeCell.textContent = expense.name; // Type is the same as expense name

        // Calculate total value for the expense entries of the current month
        let totalValue = 0;
        currentMonthEntries.forEach(entry => {
            totalValue += entry.value || 0; // Add entry value to totalValue
        });

        const valueCell = expensesTable.rows[expensesTable.rows.length - 1].insertCell();
        valueCell.textContent = totalValue;

        // Store total value in categoryTotals object
        categoryTotals[expense.name] = (categoryTotals[expense.name] || 0) + totalValue;

        // You can add more logic here if you want to display additional entry information
    });

    // Add a row for the total expenses
    const totalRow = expensesTable.insertRow();
    totalRow.insertCell().textContent = "Total";
    let totalExpenses = 0;
    for (const category in categoryTotals) {
        totalExpenses += categoryTotals[category];
    }
    const totalCell = totalRow.insertCell();
    totalCell.textContent = totalExpenses;

    return expensesTable;
}



const renderExpensesTable = (expensesTable, expenses) => {
    expenses.forEach(expense => {
        if (expense.entries && expense.entries.length > 0) {
            expense.entries.forEach(entry => {
                // Create a new row for each entry
                const row = expensesTable.insertRow();

                // Insert cells for Type, value, date, and description
                const typeCell = row.insertCell();
                typeCell.textContent = expense.name; // Type is the same as expense name

                const descriptionCell = row.insertCell();
                descriptionCell.textContent = entry.description || '-'; // Display description or '-'

                const valueCell = row.insertCell();
                valueCell.textContent = entry.value || 0; // If entry value doesn't exist, default to 0

                const dateCell = row.insertCell();
                dateCell.textContent = new Date(entry.date).toLocaleDateString();

            });
        }
    });

    return expensesTable;
}

function submitExpenseForm() {
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;

    // Replace this with your actual form submission logic
    //addExpense({ type, description, amount});

    // Close the modal after form submission
    $("#exampleModal").modal("hide");
  }
  




