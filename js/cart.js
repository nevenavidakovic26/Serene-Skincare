// Funkcija za prikazivanje proizvoda u korpi
function displayCart() {
    var cartContainer = document.getElementById('cart-container');
    var totalContainer = document.getElementById('total');
    var cartContent = JSON.parse(localStorage.getItem('cart')) || [];
    var products = JSON.parse(localStorage.getItem('products')) || [];
    var total = 0; // Promenljiva za čuvanje ukupne cene narudžbine

    if (cartContent.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="6">Your cart is empty</td></tr>';
        totalContainer.textContent = ''; // Resetujemo prikaz ukupne cene
        return;
    }

    cartContainer.innerHTML = ''; // Resetujemo sadržaj kontejnera

    cartContent.forEach(function(productId) {
        var product = products.find(function(item) {
            return item.id == productId; // Uporedi kao brojeve, ne kao stringove
        });

        if (product) {
            total += product.price; // Dodaj cenu proizvoda na ukupnu cenu
            cartContainer.innerHTML += `
                <tr>
                    <td class="product-thumbnail"><img src="${product.img.src}" alt="${product.img.alt}" class="img-fluid"></td>
                    <td class="product-name">${product.name}</td>
                    <td class="product-price">$${product.price.toFixed(2)}</td>
                    <td class="product-quantity">1</td>
                    <td class="product-total">$${product.price.toFixed(2)}</td>
                    <td class="product-remove"><button class="btn btn-primary remove-from-cart" data-product-id="${product.id}">Remove</button></td> <!--dugme za brisanje samo tog proizvoda iz carta-->
                </tr>
            `;
        } else {
            console.error('Product not found for ID:', productId);
        }
    });

    // Prikaz ukupne cene narudžbine
    totalContainer.textContent = `$${total.toFixed(2)}`;

    // Event listener za dugme "Remove" za svaki proizvod
    var removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Sprečavanje podrazumevanog ponašanja dugmeta
            var productId = event.target.getAttribute('data-product-id');
            removeFromCart(productId);
        });
    });
}

// Funkcija za uklanjanje proizvoda iz korpe
function removeFromCart(productId) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var index = cart.indexOf(productId);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart(); // Ponovno prikazivanje korpe nakon uklanjanja proizvoda
    }
}

// Poziv funkcije za prikazivanje korpe kada se stranica učita
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
});
