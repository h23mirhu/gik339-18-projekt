// Saves the server link to the varable url
const url = 'http://localhost:3000/items';

// Eventlistener that start the function fetchData when the window is loaded
window.addEventListener('load', fetchData);

// function that fetches data from the database
function fetchData() {
    // Fetches data from the database
    fetch(url)
        // .then() handles asynchronous calls
        // The data is translated to an array
        .then((result) => result.json())
        // Loops through the users-objects if items are more than 0
        .then((items) => {
            // If there are items in the table a ul element and li elements are written to the varaible html
            if (items.length > 0) {
                let html = `<ul class="row m-0 list-unstyled">`;
                items.forEach((item) => {
                    html += `
                        <li class="col-12 d-flex flex-column bg-${item.category} rounded-pill p-5 m-1">
                            <h3>Item: ${item.name}</h3>
                            <p>
                                Category: ${item.category}<br>
                                Quantity: ${item.quantity}  Price: ${item.price}
                            </p>
                            <div class="d-flex justify-content-end">
                                <button class="border-0 rounded-pill me-1 px-3 bg-body" onclick="setCurrentItem(${item.id})">
                                    Update
                                </button>
                                <button class="border-0 rounded-pill ms-1 px-3 bg-body" onclick="deleteItem(${item.id})">
                                    Delete
                                </button>
                            </div>
                        </li>
                    `;
                });
                html += `</ul>`;

                // Gets the parent-element that will contain the new ul-element
                const listContainer = document.getElementById('listContainer');
                // Writes html to listContainer
                listContainer.innerHTML = '';
                // Adds html to the DOM
                listContainer.insertAdjacentHTML('beforeend', html);
            } else {
                // Writes p to listContainer
                listContainer.innerHTML = '<p class="text-center">There are no items available</p>';
            }
        });
}

// Function for the Update button
function setCurrentItem(id) {
    // The item-id is written to the console
    console.log('current', id);

    // fetches item by id
    fetch(`${url}/${id}`)
        .then((result) => result.json())
        .then((item) => {
            console.log(item);
            itemForm.name.value = item.name;
            itemForm.category.value = item.category;
            itemForm.quantity.value = item.quantity;
            itemForm.price.value = item.price;

            // Saves the items id in the localstorage
            localStorage.setItem('currentId', item.id);
        });
}

// Function for the Delete button 
function deleteItem(id) {
    console.log('delete', id);
    fetch(`${url}/${id}`, { method: 'DELETE' })
        .then((result) => {
            fetchData();

            // A modal that shows a message when item is deleted
            const modalBody = document.querySelector('#message .modal-body');
            const message = 'The item has been deleted!';
            modalBody.innerHTML = `<p>${message}</p>`;

            const modal = new bootstrap.Modal(document.getElementById('message'));
            modal.show();
    });
}

// An eventlistener for the event submit starts the handlesubmit function
itemForm.addEventListener('submit', handleSubmit);

// Function for the Submit button
function handleSubmit(e) {
    // Prevetns the submit button from reloading the webisite
    e.preventDefault();

    // Writes the keys with empty values to the variable
    const serverItemObject = {
        name: '',
        category: '',
        quantity: '',
        price: ''
    };
    // Gives the keys their values
    serverItemObject.name = itemForm.name.value;
    serverItemObject.category = itemForm.category.value;
    serverItemObject.quantity = itemForm.quantity.value;
    serverItemObject.price = itemForm.price.value;

    // Writes the id in the localstorage to the variable
    const id = localStorage.getItem('currentId');
    // If there is an id, the id of the item-objekt is written to serverItemObject
    if (id) {
        serverItemObject.id = id;
    }

    // Checks the method used, PUT or POST
    const request = new Request(url, {
        method: serverItemObject.id ? 'PUT' : 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(serverItemObject)
    });

    fetch(request).then((response) => {
        fetchData();

        // A modal that shows a message when item is updated or added
        const modalBody = document.querySelector('#message .modal-body');
        const message = serverItemObject.id ? 'The item has been updated!' : 'A new item has been added!';
        modalBody.innerHTML = `<p>${message}</p>`;

        const modal = new bootstrap.Modal(document.getElementById('message'));
        modal.show();

        // When request is finnished the id is removed from the localStorage
        localStorage.removeItem('currentId');
        itemForm.reset();
    });
}