document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('addProductForm');
    const editProductForm = document.getElementById('editProductForm');

    if (addProductForm) {
        addProductForm.addEventListener('submit', validateProductForm);
    }

    if (editProductForm) {
        editProductForm.addEventListener('submit', validateProductForm);
    }
});

function validateProductForm(event) {
    const name = document.getElementById('name').value.trim();
    const price = document.getElementById('price').value.trim();
    const description = document.getElementById('description').value.trim();

    if (name === '' || price === '' || description === '') {
        alert('All fields are required.');
        event.preventDefault();
    }

    if (isNaN(price) || price <= 0) {
        alert('Please enter a valid price.');
        event.preventDefault();
    }
}
