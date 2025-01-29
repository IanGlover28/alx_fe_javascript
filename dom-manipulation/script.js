document.addEventListener("DOMContentLoaded", function () {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteButton = document.getElementById("newQuote");
    const categorySelect = document.getElementById("categorySelect");
    const importFileInput = document.getElementById("importFile");
    const exportButton = document.getElementById("exportQuotes");

    let quotes = JSON.parse(localStorage.getItem("quotes")) || [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
        { text: "It does not matter how slowly you go as long as you do not stop.", category: "Perseverance" },
        { text: "Happiness depends upon ourselves.", category: "Happiness" }
    ];

    // ✅ Function to save quotes to local storage
    function saveQuotes() {
        localStorage.setItem("quotes", JSON.stringify(quotes));
    }

    // ✅ Function to update category dropdown
    function updateCategories() {
        const categories = [...new Set(quotes.map(q => q.category))];
        categorySelect.innerHTML = `<option value="all">All Categories</option>`;
        categories.forEach(category => {
            let option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    // ✅ Function to show a random quote
    function showRandomQuote() {
        let selectedCategory = categorySelect.value;
        let filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(q => q.category === selectedCategory);
        
        if (filteredQuotes.length === 0) {
            quoteDisplay.textContent = "No quotes available in this category.";
            return;
        }

        let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        let selectedQuote = filteredQuotes[randomIndex];
        quoteDisplay.textContent = `"${selectedQuote.text}" - ${selectedQuote.category}`;

        // ✅ Save last viewed quote to session storage
        sessionStorage.setItem("lastViewedQuote", JSON.stringify(selectedQuote));
    }

    // ✅ Function to restore last viewed quote from session storage
    function restoreLastViewedQuote() {
        const lastQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
        if (lastQuote) {
            quoteDisplay.textContent = `"${lastQuote.text}" - ${lastQuote.category}`;
        }
    }

    // ✅ Function to add a new quote
    function addQuote() {
        const newQuoteText = document.getElementById("newQuoteText").value.trim();
        const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

        if (newQuoteText === "" || newQuoteCategory === "") {
            alert("Please enter both a quote and a category!");
            return;
        }

        // Add new quote to the quotes array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Save to local storage
        saveQuotes();

        // Update category dropdown
        updateCategories();

        // Clear input fields
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";

        alert("Quote added successfully!");
    }

    // ✅ Function to create the quote input form dynamically
    function createAddQuoteForm() {
        if (document.getElementById("quoteForm")) return;

        const formContainer = document.createElement("div");
        formContainer.id = "quoteForm";

        const quoteInput = document.createElement("input");
        quoteInput.type = "text";
        quoteInput.id = "newQuoteText";
        quoteInput.placeholder = "Enter a new quote";

        const categoryInput = document.createElement("input");
        categoryInput.type = "text";
        categoryInput.id = "newQuoteCategory";
        categoryInput.placeholder = "Enter quote category";

        const addButton = document.createElement("button");
        addButton.textContent = "Add Quote";
        addButton.id = "addQuote";
        addButton.addEventListener("click", addQuote);

        formContainer.appendChild(quoteInput);
        formContainer.appendChild(categoryInput);
        formContainer.appendChild(addButton);
        document.body.appendChild(formContainer);
    }

    // ✅ Function to export quotes as a JSON file
    function exportQuotes() {
        const dataStr = JSON.stringify(quotes, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "quotes.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // ✅ Function to import quotes from a JSON file
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
            try {
                const importedQuotes = JSON.parse(event.target.result);
                if (Array.isArray(importedQuotes) && importedQuotes.every(q => q.text && q.category)) {
                    quotes.push(...importedQuotes);
                    saveQuotes();
                    updateCategories();
                    alert("Quotes imported successfully!");
                } else {
                    alert("Invalid JSON format!");
                }
            } catch (error) {
                alert("Error reading JSON file!");
            }
        };
        fileReader.readAsText(event.target.files[0]);
    }

    // ✅ Event Listeners
    newQuoteButton.addEventListener("click", showRandomQuote);
    categorySelect.addEventListener("change", showRandomQuote);
    exportButton.addEventListener("click", exportQuotes);
    importFileInput.addEventListener("change", importFromJsonFile);

    // ✅ Initialize categories, restore session data, and create form
    updateCategories();
    createAddQuoteForm();
    restoreLastViewedQuote();
});
