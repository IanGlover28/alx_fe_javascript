document.addEventListener("DOMContentLoaded", function () {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteButton = document.getElementById("newQuote");
    const addQuoteButton = document.getElementById("addQuote");
    const categorySelect = document.getElementById("categorySelect");

    let quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
        { text: "It does not matter how slowly you go as long as you do not stop.", category: "Perseverance" },
        { text: "Happiness depends upon ourselves.", category: "Happiness" }
    ];

    // Populate category dropdown
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

    // Show random quote
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

    // Add new quote
    function addQuote() {
        const newQuoteText = document.getElementById("newQuoteText").value.trim();
        const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

        if (newQuoteText === "" || newQuoteCategory === "") {
            alert("Please enter both a quote and a category!");
            return;
        }

        // Add new quote to the array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Update category list
        updateCategories();

        // Clear input fields
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
    }

    // Event Listeners
    newQuoteButton.addEventListener("click", showRandomQuote);
    addQuoteButton.addEventListener("click", addQuote);
    categorySelect.addEventListener("change", showRandomQuote);

    // Initialize category options
    updateCategories();
});
