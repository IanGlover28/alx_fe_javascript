document.addEventListener("DOMContentLoaded", function () {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteButton = document.getElementById("newQuote");
    const categorySelect = document.getElementById("categoryFilter");
    const importFileInput = document.getElementById("importFile");
    const exportButton = document.getElementById("exportQuotes");
    const conflictMessage = document.getElementById("conflictMessage");

    // Load quotes from local storage or set default quotes
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

    // ✅ Simulate fetching quotes from JSONPlaceholder
    async function fetchQuotesFromServer() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();

            // Simulate extracting quote-like content from the posts
            const serverQuotes = data.slice(0, 5).map(post => ({
                text: post.title,
                category: "General"  // You can change this to a more relevant category or randomize it.
            }));

            return serverQuotes;
        } catch (error) {
            console.error("Failed to fetch quotes from server:", error);
            return [];
        }
    }

    // ✅ Function to synchronize quotes from the "server"
    async function syncQuotes() {
        const serverQuotes = await fetchQuotesFromServer();

        // Conflict resolution: choose the server data as the authoritative source
        const mergedQuotes = [...serverQuotes, ...quotes];
        quotes = mergedQuotes.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.text === value.text && t.category === value.category
            ))
        );

        // Save to local storage
        saveQuotes();

        // Display conflict resolution message
        conflictMessage.textContent = "Data has been synchronized with the server!";
        setTimeout(() => conflictMessage.textContent = "", 3000); // Clear after 3 seconds
    }

    // ✅ Function to populate categories dynamically
    function populateCategories() {
        const categories = [...new Set(quotes.map(q => q.category))];
        categorySelect.innerHTML = `<option value="all">All Categories</option>`;
        categories.forEach(category => {
            let option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        // Restore the last selected category from local storage
        const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
        if (lastSelectedCategory) {
            categorySelect.value = lastSelectedCategory;
        }
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
        quoteDisplay.textContent = `"${filteredQuotes[randomIndex].text}" - ${filteredQuotes[randomIndex].category}`;
    }

    // ✅ Function to filter quotes based on selected category
    function filterQuotes() {
        const selectedCategory = categorySelect.value;
        localStorage.setItem("lastSelectedCategory", selectedCategory);  // Save selected filter
        showRandomQuote();  // Update the displayed quote based on the filter
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

        // Save quotes to local storage
        saveQuotes();

        // Update category dropdown
        populateCategories();

        // Clear input fields
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";

        alert("Quote added successfully!");
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
                    populateCategories();
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
    categorySelect.addEventListener("change", filterQuotes);
    exportButton.addEventListener("click", exportQuotes);
    importFileInput.addEventListener("change", importFromJsonFile);

    // ✅ Periodic sync with the server every 10 seconds
    setInterval(syncQuotes, 10000);

    // ✅ Initialize categories, populate the category filter, and show a quote
    populateCategories();
    showRandomQuote();
});
