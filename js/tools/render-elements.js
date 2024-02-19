export const renderHeading = (text) => {
    const header = document.createElement('h2');
    header.textContent = text; 
    header.classList.add("text-white");
    header.classList.add("bg-dark");
    header.classList.add("p-2");
    return header;
}

export const renderNote = (text) => {
    const note = document.createElement('h6');
    note.textContent = text; 
    note.classList.add("text-dark");
    note.classList.add("bg-light");
    note.classList.add("p-2");
    return note;
}

export const renderBaseTable = () => {
    const table = document.createElement('table');
    table.classList.add('table'); // Add class to the table element
    table.classList.add('table-hover'); // Add class to the table element
    return table;
}

export const appendToContainer = (elements, container) => {
    elements.map( element => container.appendChild(element));
}