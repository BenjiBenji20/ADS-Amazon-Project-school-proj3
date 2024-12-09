// TAB filter ajax
document.querySelector('.tabs-container').addEventListener("click", async function(event) {
  if (event.target.classList.contains("tab")) {
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    event.target.classList.add("active");

    const selectedCategory = event.target.textContent.trim();

    try {
      const response = await fetch(`/product-connection/tab-filter?category=${encodeURIComponent(selectedCategory)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const filteredProducts = await response.json();
      displayFilteredProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  }
});


// SEARCH BAR to filter products
// input enter event
document.querySelector('.search-input').addEventListener("input", async function(event) {
  const searchInput = document.querySelector('.search-input').value.trim().toLowerCase();

  try {
    const response = await fetch(`/product-connection/search-filter?search=${encodeURIComponent(searchInput)}`);
    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const searchedProducts = await response.json();
    displayFilteredProducts(searchedProducts);
  } 
  catch (error) {
    console.error('Error retrieving products from search', error);
  }
});


// FILTER ICON max-min price for filtering products
document.querySelector('.filter-btn').addEventListener("click", async function() {
  const minPrice = document.querySelector('.min-price').value;
  const maxPrice = document.querySelector('.max-price').value;

  try {
    const response = await fetch(`/product-connection/filter-icon-filter?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const filteredProducts = await response.json();
    displayFilteredProducts(filteredProducts);
  } 
  catch (error) {
    console.error('Error retrieving filtered products', error);  
  }
});


// Function to update the product display on the page
function displayFilteredProducts(products) {
  const productContainer = document.querySelector(".product-container"); 
  productContainer.innerHTML = ""; // Clear previous products

  // Render each product using the EJS-like structure
  products.forEach((product, index) => {
    const productHTML = `
      <form action="/check-out-routes" method="POST">
        <div class="card" style="width: 18rem;">
          <img src="/images/product-images/${product.product_img}" class="card-img-top" alt="${product.product_name}">
          <div class="card-body">
            <div class="product-title-and-rating">
              <span class="title">${product.product_name}</span>
              <span class="rating">${product.product_rating} <i class="bi bi-star-fill"></i></span>
            </div>
            <div class="description">${product.product_description}</div>
            <div class="product-spec">
              <div class="div">
                <span class="category">${product.product_category}</span>
                <span class="color">Color: ${product.product_color}</span>
              </div>
              <div class="div">
                <span class="size">Size: ${product.product_size}</span>
                <span class="stock">Stock: ${product.product_stock_quantity}</span>
              </div>
            </div>
            <div class="price">₱${product.product_price}</div>
          </div>
          <!-- Hidden inputs to store the details of selected item -->
          <input type="hidden" name="product_name_${index}" value="${product.product_name}">
          <input type="hidden" name="product_rating_${index}" value="${product.product_rating}">
          <input type="hidden" name="product_description_${index}" value="${product.product_description}">
          <input type="hidden" name="product_category_${index}" value="${product.product_category}">
          <input type="hidden" name="product_color_${index}" value="${product.product_color}">
          <input type="hidden" name="product_size_${index}" value="${product.product_size}">
          <input type="hidden" name="product_price_${index}" value="${product.product_price}">
          <input type="hidden" name="product_image_${index}" value="${product.product_img}">
          <button type="submit" class="btn btn-primary">BUY</button>
        </div>
      </form>
    `;

    productContainer.insertAdjacentHTML("beforeend", productHTML);
  });
}