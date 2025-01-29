document.addEventListener("DOMContentLoaded", function () {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteButton = document.getElementById("newQuote");
    const categorySelect = document.getElementById("categorySelect");

    let quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
        { text: "It does not matter how slowly you go as long as you do not stop.", category: "Perseverance" },
        { text: "Happiness depends upon ourselves.", category: "Happiness" }
    ];

    // ✅ Function to populate category dropdown
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
        quoteDisplay.textContent = `"${filteredQuotes[randomIndex].text}" - ${filteredQuotes[randomIndex].category}`;
    }

    // ✅ Function to add new quote
    function addQuote() {
        const newQuoteText = document.getElementById("newQuoteText").value.trim();
        const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

        if (newQuoteText === "" || newQuoteCategory === "") {
            alert("Please enter both a quote and a category!");
            return;
        }

        // Add new quote to the quotes array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Update category dropdown
        updateCategories();

        // Clear input fields
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";

        alert("Quote added successfully!");
    }

    // ✅ Function to create the quote input form dynamically
    function createAddQuoteForm() {
        if (document.getElementById("quoteForm")) return; // Prevent duplicate forms

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

        // Append elements to form container
        formContainer.appendChild(quoteInput);
        formContainer.appendChild(categoryInput);
        formContainer.appendChild(addButton);

        // Append form to the body (or another container)
        document.body.appendChild(formContainer);
    }

    // ✅ Event Listeners
    newQuoteButton.addEventListener("click", showRandomQuote);
    categorySelect.addEventListener("change", showRandomQuote);

    // ✅ Initialize category options and add form
    updateCategories();
    createAddQuoteForm();
});
