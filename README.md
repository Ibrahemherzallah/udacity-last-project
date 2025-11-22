Udacity Angular Project
---------------------------------

An Angular Single Page Application created for the Udacity MyStore project.  
The app lets users browse available products, view detailed information, add items to a shopping cart, complete checkout with validation, and see an order confirmation.  
All product data is retrieved from `assets/data.json`.

---

Features
--------
- Product List page with quantity selection and “Add to Cart”
- Product Details page (`/products/:id`)
- Shopping Cart page with update, remove, clear, and total calculation
- Checkout form featuring client-side validation
- Order Confirmation page showing the submitted customer info
- Cart data persisted (e.g., using localStorage)

---

Routes
------
- `/` → Product List
- `/products/:id` → Product Details
- `/cart` → Cart
- `/checkout` → Checkout
- `/confirmation` → Order Confirmation

Product cards link to details using:

```html
<a [routerLink]="['/products', product.id]"></a>
