# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 'products/index' [GET]
- Show 'products/:id' [GET]
- Create [token required] 'products/create' [POST]
- [OPTIONAL] Top 5 most popular products 'products/topFive' [GET]
- [OPTIONAL] Products by category (args: product category) 'products/:category' [GET]

#### Users
- Index [token required] 'users/index' [GET]
- Show [token required] 'users/:id' [GET]
- Create N[token required] 'users/create' [POST]

#### Orders
- Current Order by user (args: user id)[token required] 'orders/:userId' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] 'orders/history/:userId' [GET]

## Data Shapes
#### Product
Table:
-  id: serial primary key
- name: varchar
- price: decimal
- [OPTIONAL] category: varchar

#### User
- id: serial primary key
- firstName: varchar
- lastName: varchar
- password_digest: varchar

#### Orders
- id: serial primary key
- user_id: varchar
- status of order (active or complete): varchar

- id of each product in the order
- quantity of each product in the order

### Order-products table
- id: serial primary key
- quantity: integer
- order_id: bigint references orders(id)
- product_id: bigint references products(id)

