const inventory = [];

// Add event listener to the form
document.getElementById('inventory-form').addEventListener('submit', function(event) {
    event.preventDefault();
   
    const name = document.getElementById('item-name').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const price = parseFloat(document.getElementById('price').value);
    const category = document.getElementById('category').value.trim();

    if (!name || quantity <= 0 || price <= 0 || !category) {
        alert('Please enter valid values.');
        return;
    }

    const item = { name, quantity, price, category };
    inventory.push(item);
    updateInventoryList();
    updateTotalValue();
   
    document.getElementById('inventory-form').reset();
});

// Function to update inventory list
function updateInventoryList() {
    const list = document.getElementById('inventory-list');
    list.innerHTML = '';

    inventory.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <strong>${item.name}</strong><br>
            Quantity: ${item.quantity}<br>
            Price: $${item.price.toFixed(2)}<br>
            Category: ${item.category}<br>
            <button onclick="deleteItem(${index})">Delete</button>
        `;
        list.appendChild(itemDiv);
    });
}

// Function to delete an item
function deleteItem(index) {
    inventory.splice(index, 1);
    updateInventoryList();
    updateTotalValue();
}

// Function to sort items
function sortItems(order) {
    inventory.sort((a, b) => {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    updateInventoryList();
}

// Function to update total value
function updateTotalValue() {
    const totalValue = inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-value').textContent = totalValue.toFixed(2);
}

// Search functionality
document.getElementById('search-bar').addEventListener('input', function(event) {
    const searchText = event.target.value.toLowerCase();
    const filteredItems = inventory.filter(item =>
        item.name.toLowerCase().includes(searchText) ||
        item.category.toLowerCase().includes(searchText)
    );
   
    const list = document.getElementById('inventory-list');
    list.innerHTML = '';

    filteredItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <strong>${item.name}</strong><br>
            Quantity: ${item.quantity}<br>
            Price: $${item.price.toFixed(2)}<br>
            Category: ${item.category}<br>
            <button onclick="deleteItem(${index})">Delete</button>
        `;
        list.appendChild(itemDiv);
    });
});