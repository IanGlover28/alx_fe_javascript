// ✅ 1. Quotes array with text and category properties
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "It does not matter how slowly you go as long as you do not stop.", category: "Perseverance" },
    { text: "Happiness depends upon ourselves.", category: "Happiness" }
];

// ✅ 2. Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById("quoteDisplay").textContent = "No quotes available.";
        return;
    }

    let randomIndex = Math.floor(Math.random() * quotes.length);
    let randomQuote = quotes[randomIndex];

    document.getElementById("quoteDisplay").textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// ✅ 3. Function to create the "Add Quote" form dynamically
function createAddQuoteForm() {
    if (document.getElementById("quoteForm")) return; // Prevent duplicate forms

    // Create form container
    const formContainer = document.createElement("div");
    formContainer.id = "quoteForm";

    // Create input for quote text
    const quoteInput = document.createElement("input");
    quoteInput.type = "text";
    quoteInput.id = "newQuoteText";
    quoteInput.placeholder = "Enter a new quote";

    // Create input for quote category
    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.id = "newQuoteCategory";
    categoryInput.placeholder = "Enter quote category";

    // Create "Add Quote" button
    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", addQuote);

    // Append elements to form container
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    // Append form to the body (or another container)
    document.body.appendChild(formContainer);
}

// ✅ 4. Function to add a new quote to the array and update the UI
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both a quote and a category!");
        return;
    }

    // Add new quote to the quotes array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Show a success message
    alert("Quote added successfully!");
}

// ✅ 5. Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// ✅ 6. Ensure the "Add Quote" form is created when the page loads
document.addEventListener("DOMContentLoaded", createAddQuoteForm);
