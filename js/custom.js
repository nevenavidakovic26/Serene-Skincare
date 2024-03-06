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

function displayProducts(products) {
    var container = document.getElementById("products-container");
    container.innerHTML = "";

    products.forEach(function (product) {
        container.innerHTML += `
            <div class="col-12 col-md-4 col-lg-3 mb-5">
                <a class="product-item" href="#">
                    <img src="${product.img.src}" class="img-fluid product-thumbnail" alt="${product.img.alt}">
                    <h3 class="product-title">${product.name}</h3>
                    <strong class="product-price">$${product.price.toFixed(2)}</strong>
                    <p class="product-desc">${product.desc}</p>
                    <button class="btn btn-primary add-to-cart" data-product-id="${product.id}" onclick="addToCart(event)">+</button>
                </a>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var products;
    var brands;
    var categories;

    fetchData("assets/products.json", function (productsData) {
        products = productsData;
        fetchData("assets/brand.json", function (brandsData) {
            brands = brandsData;
            fetchData("assets/category.json", function (categoriesData) {
                categories = categoriesData;
                displayProducts(products);

                var brandSelect = document.querySelector('select[name="brend"]');
                var categorySelect = document.querySelector('select[name="kategorija"]');

                brandSelect.addEventListener('change', function () {
                    var selectedBrand = brandSelect.value;
                    var filteredProducts = products.filter(function (product) {
                        return product.brand === parseInt(selectedBrand) || selectedBrand === '';
                    });

                    var selectedCategory = categorySelect.value;
                    if (selectedCategory !== '') {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return Array.isArray(product.category) ? product.category.includes(parseInt(selectedCategory)) : product.category === parseInt(selectedCategory);
                        });
                    }

                    displayProducts(filteredProducts);
                });

                categorySelect.addEventListener('change', function () {
                    var selectedCategory = categorySelect.value;
                    var filteredProducts = products;

                    if (selectedCategory !== '') {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return Array.isArray(product.category) ? product.category.includes(parseInt(selectedCategory)) : product.category === parseInt(selectedCategory);
                        });
                    }

                    var selectedBrand = brandSelect.value;
                    if (selectedBrand !== '') {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return product.brand === parseInt(selectedBrand);
                        });
                    }

                    displayProducts(filteredProducts);
                });
                var nameInput = document.querySelector('input[name="nameProduct"]');

                nameInput.addEventListener('input', function () {
                    var searchText = nameInput.value.toLowerCase();
                    var filteredProducts = products.filter(function (product) {
                        return product.name.toLowerCase().includes(searchText);
                    });

                    var selectedBrand = brandSelect.value;
                    var selectedCategory = categorySelect.value;

                    if (selectedBrand !== '') {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return product.brand === parseInt(selectedBrand);
                        });
                    }

                    if (selectedCategory !== '') {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return Array.isArray(product.category) ? product.category.includes(parseInt(selectedCategory)) : product.category === parseInt(selectedCategory);
                        });
                    }

                    displayProducts(filteredProducts);
                });
            });
        });
    });
});



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




