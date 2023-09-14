const form = document.getElementById('chocolate-form');
const selectedChocolates = document.getElementById('selected-chocolates');
const selectedList = document.getElementById('selected-list');
const totalPriceSpan = document.getElementById('total-price');

// Get all elements with the class 'button-25'
const buttons25 = document.getElementsByClassName('button-25');

for (const button25 of buttons25) {
    // Check if the element has the 'data-price' attribute
    const price = button25.getAttribute('data-price');
    const name = button25.getAttribute('data-name');

    if (price !== null) {
        // Get the closest 'chocolate-option' element
        const mainCont = button25.closest('.chocolate-option');

        if (mainCont) {
            // Append the price to the 'chocolate-option' element
            mainCont.insertAdjacentHTML('beforeend', `<span> ${name} Price:$${price}</span>`);
        } else {
            console.error("No matching '.chocolate-option' element found.");
        }
    } else {
        console.error("The 'data-price' attribute is missing or null for one or more elements with the class 'button-25'.");
    }
}

let totalPrice = 0;


form.addEventListener('click', (event) => {
    if (event.target.tagName === 'INPUT' && event.target.type === 'button') {
        const button = event.target;
        button.classList.toggle('selected'); // Toggle the "selected" class
        
        // Change the button text based on the "selected" class
        // const name = button.getAttribute('data-name');
        button.value = button.classList.contains('selected') ? `Remove from Cart` : `Add to Cart`;

        const selectedCount = Array.from(form.querySelectorAll('input[type="button"].selected')).length;
        if (selectedCount > 8) {
            button.classList.remove('selected');
            alert('You can select up to 8 chocolates.');
            return;
        }

        // Calculate price based on selected chocolates
        calculateTotalPrice();
        displaySelectedChocolates();
    }
});

// Call changeName for each button on page load
const buttons = form.querySelectorAll('input[type="button"]');
buttons.forEach((button) => {
    changeName(button);
});

function changeName(button) {
    // const name = button.getAttribute('data-name');
    button.value = button.classList.contains('selected') ? `Remove from Cart` : `Add  to Cart`;
}

function calculateTotalPrice() {
    totalPrice = Array.from(form.querySelectorAll('input[type="button"].selected')).reduce((price, button) => {
        return price + parseFloat(button.getAttribute('data-price'));
    }, 0);

    totalPriceSpan.textContent = totalPrice.toFixed(2);
}

function displaySelectedChocolates() {
    const selectedButtons = form.querySelectorAll('input[type="button"].selected');
    selectedList.innerHTML = '';

    selectedButtons.forEach((button) => {
        const name = button.getAttribute('data-name');
        const listItem = document.createElement('li');
        listItem.textContent = name;
        selectedList.appendChild(listItem);
    });

    selectedChocolates.classList.remove('hidden');
}
