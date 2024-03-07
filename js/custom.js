//Dugme za scroll na gore
const goTopBtn = document.querySelector('.go-top-btn');

window.addEventListener('scroll', checkHeight)

function checkHeight() {
    if (window.scrollY > 600) {
        goTopBtn.style.display = "flex"
    } else {
        goTopBtn.style.display = "none"
    }
}

goTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
});


//FILTRIRANJE I ISPIS
// Funkcija za dohvat podataka sa servera
function fetchData(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

// Funkcija za prikazivanje proizvoda
function displayProducts(products) {
    var container = document.getElementById("products-container");
    container.innerHTML = "";

    products.forEach(function (product) {
        var productItem = document.createElement('div');
        productItem.classList.add('col-12', 'col-md-4', 'col-lg-3', 'mb-5');
        productItem.innerHTML = `
            <div class="product-item">
                <img src="${product.img.src}" class="img-fluid product-thumbnail" alt="${product.img.alt}">
                <h3 class="product-title">${product.name}</h3>
                <strong class="product-price">$${product.price.toFixed(2)}</strong>
                <p class="product-desc">${product.desc}</p>
                <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">Add to cart</button>
      
            </div>
        `;
        container.appendChild(productItem);
    });
}

// Funkcija za filtriranje proizvoda prema brendu i kategoriji
function filterProducts(products, brand, category) {
    return products.filter(function (product) {
        var matchesBrand = brand === '' || product.brand === parseInt(brand);
        var matchesCategory = category === '' || (Array.isArray(product.category) ? product.category.includes(parseInt(category)) : product.category === parseInt(category));
        return matchesBrand && matchesCategory;
    });
}

// Funkcija za pretragu proizvoda po nazivu
function searchProducts(products, searchText) {
    return products.filter(function (product) {
        return product.name.toLowerCase().includes(searchText.toLowerCase());
    });
}

//Funkcija za poruku
function showAddedToCartMessage() {
    var message = document.getElementById("added-to-cart-message");
    message.classList.remove("hide");
    setTimeout(function() {
        message.classList.add("hide");
    }, 2000); // Poruka će se automatski sakriti nakon 2 sekunde
}

// Funkcija za dodavanje proizvoda u korpu
function addToCart(event) {
    event.preventDefault();
    var productId = event.target.getAttribute('data-product-id');
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
}

//sortiranje naziv
function sortProducts(products, order) {
    if (order === 'a-z') {
        return products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === 'z-a') {
        return products.sort((a, b) => b.name.localeCompare(a.name));
    } else {
        return products;
    }
}

//sortiranje po ceni

function sortProductsByPrice(products, sortOrder) {
    if (sortOrder === 'lowest') {
        return products.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highest') {
        return products.sort((a, b) => b.price - a.price);
    } else {
        return products;
    }
}

// Funkcija za inicijalizaciju
function initialize() {
    var products;
    var brands;
    var categories;

    fetchData("assets/products.json", function (productsData) {
        products = productsData;
        displayProducts(products);

        // Filtriranje proizvoda po brendu i kategoriji
        var brandSelect = document.querySelector('select[name="brend"]');
        var categorySelect = document.querySelector('select[name="kategorija"]');
        var nameInput = document.querySelector('input[name="nameProduct"]');
        var sortSelect = document.querySelector('select[name="sort"]'); // 
        var priceSelect = document.querySelector('select[name="cena"]');

        brandSelect.addEventListener('change', updateProducts);
        categorySelect.addEventListener('change', updateProducts);
        nameInput.addEventListener('input', updateProducts);
        sortSelect.addEventListener('change', updateProducts); // Ispravka
        priceSelect.addEventListener('change', updateProducts);

        function updateProducts() {
            var filteredProducts = filterProducts(products, brandSelect.value, categorySelect.value);
            filteredProducts = searchProducts(filteredProducts, nameInput.value);
            filteredProducts = sortProducts(filteredProducts, sortSelect.value);
            filteredProducts = sortProductsByPrice(filteredProducts, priceSelect.value);
            displayProducts(filteredProducts);
        }

        // Event delegation za dugme "Dodaj u korpu"
        var productsContainer = document.getElementById('products-container');
        productsContainer.addEventListener('click', function (event) {
            if (event.target.classList.contains('add-to-cart')) {
                addToCart(event);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", initialize);




//Learn more dugme
document.addEventListener("DOMContentLoaded", function () {

    var moreButtons = document.querySelectorAll('.more');
    moreButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var parent = this.closest('.col-12');
            var secondParagraph = parent.querySelector('.second-paragraph');

            if (secondParagraph.style.display === 'none') {
                secondParagraph.style.display = 'block';
                this.textContent = 'Learn Less';
            } else {
                secondParagraph.style.display = 'none';
                this.textContent = 'Learn More';
            }
        });
    });
});

//Review templejt

(function () {
    'use strict';

    var tinyslider = function () {
        var el = document.querySelectorAll('.testimonial-slider');

        if (el.length > 0) {
            var slider = tns({
                container: '.testimonial-slider',
                items: 1,
                axis: "horizontal",
                controlsContainer: "#testimonial-nav",
                swipeAngle: false,
                speed: 700,
                nav: true,
                controls: true,
                autoplay: true,
                autoplayHoverPause: true,
                autoplayTimeout: 3500,
                autoplayButtonOutput: false
            });
        }
    };
    tinyslider();

})();



//REGEX validacija u Checkout 

document.getElementById("place_order_btn").addEventListener("click", function () {
    var fnameInput = document.getElementById("c_fname");
    var lnameInput = document.getElementById("c_lname");
    var emailInput = document.getElementById("c_email_address");
    var addressInput = document.getElementById("c_address");
    var phoneInput = document.getElementById("c_phone");
    var postalInput = document.getElementById("c_postal_zip");
    var countrySelect = document.getElementById("c_country");

    var fnameRegex = /^[A-Z][a-z]{2,}$/;
    var lnameRegex = /^[A-Z][a-z]{3,}$/;
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var addressRegex = /\b\w{5,}\b.*\d/;
    var phoneRegex = /^\d{10}$/;
    var postalRegex = /^\d{5}$/;

    var fnameValid = fnameRegex.test(fnameInput.value);
    var lnameValid = lnameRegex.test(lnameInput.value);
    var emailValid = emailRegex.test(emailInput.value);
    var addressValid = addressRegex.test(addressInput.value);
    var phoneValid = phoneRegex.test(phoneInput.value);
    var postalValid = postalRegex.test(postalInput.value);
    var countryValid = countrySelect.value !== "1";

    if (fnameValid && lnameValid && emailValid && addressValid && phoneValid && postalValid && countryValid) {
        var inputs = [fnameInput, lnameInput, emailInput, addressInput, phoneInput, postalInput, countrySelect];
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].style.borderColor = "";
            inputs[i].placeholder = "";
        }
        window.location.href = "thankyou.html";
    } else {

        if (!fnameValid) {
            fnameInput.style.borderColor = "red";
            fnameInput.placeholder = "Enter a valid name (e.g. Anna)";
        } else {
            fnameInput.style.borderColor = "";
            fnameInput.placeholder = "";
        }
        if (!lnameValid) {
            lnameInput.style.borderColor = "red";
            lnameInput.placeholder = "Enter a valid last name (e.g. Smith)";
        } else {
            lnameInput.style.borderColor = "";
            lnameInput.placeholder = "";
        }
        if (!emailValid) {
            emailInput.style.borderColor = "red";
            emailInput.placeholder = "Enter a valid email (e.g. example@gmail.com)";
        } else {
            emailInput.style.borderColor = "";
            emailInput.placeholder = "";
        }
        if (!addressValid) {
            addressInput.style.borderColor = "red";
            addressInput.placeholder = "Enter a valid address (e.g. Street 2)";
        } else {
            addressInput.style.borderColor = "";
            addressInput.placeholder = "";
        }
        if (!phoneValid) {
            phoneInput.style.borderColor = "red";
            phoneInput.placeholder = "Enter a number (e.g. 1234567890)";
        } else {
            phoneInput.style.borderColor = "";
            phoneInput.placeholder = "";
        }
        if (!postalValid) {
            postalInput.style.borderColor = "red";
            postalInput.placeholder = "Enter a valid ZIP code (e.g. 11000)";
        } else {
            postalInput.style.borderColor = "";
            postalInput.placeholder = "";
        }
        if (!countryValid) {
            countrySelect.style.borderColor = "red";
        } else {
            countrySelect.style.borderColor = "";
        }
    }
});




