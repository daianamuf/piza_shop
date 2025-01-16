# Pizza Shop

Welcome to the **Pizza Shop**! This application allows users to browse, manage, and order pizzas. It features a fully interactive dashboard, cart management, and user authentication.

---

## Table of Contents

-   [Description](#description)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Setup and Installation](#setup-and-installation)
-   [API Endpoints](#api-endpoints)
-   [Usage](#usage)

---

## Description

The Pizza Shop application is a full-stack web application that provides an intuitive interface for customers to:

-   Browse available pizzas
-   Add pizzas to a shopping cart
-   Place an order

It also includes management features for admins to:

-   Create, update, and delete pizzas
-   Bulk manage pizzas

---

## Features

### User Features

-   **Dashboard**: Browse available pizzas, view details, and add them to the cart.
-   **Cart Management**:
    -   Add items to the cart
    -   Update quantities
    -   Remove items
-   **Order Placement**: Submit an order for pizzas in the cart.
-   **Authentication**:
    -   Register an account
    -   Log in
    -   Manage profile

### Admin Features

-   **Pizza Management**:
    -   Create new pizzas
    -   Edit existing pizzas
    -   Delete pizzas
-   **Bulk Management**:
    -   Bulk create multiple pizzas
    -   Bulk update pizzas

---

## Technologies Used

-   **Frontend**:
    -   React
    -   Inertia.js
    -   Tailwind CSS / Bootstrap
-   **Backend**:
    -   Laravel
    -   MySQL
    -   PHP
-   **Other**:
    -   Axios (for API calls)
    -   Laravel's Session and Middleware

---

## Setup and Installation

### Prerequisites

-   PHP >= 8.0
-   Composer
-   Node.js and npm
-   MySQL database

### Steps

1. **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd pizza-shop
    ```

2. **Install dependencies**:

    ```bash
    composer install
    npm install
    ```

3. **Set up environment variables**:
   Copy the `.env.example` file and configure it for your environment.

    ```bash
    cp .env.example .env
    ```

    Update the `.env` file with your database credentials.

4. **Run migrations**:

    ```bash
    php artisan migrate
    ```

5. **Seed the database (optional)**:

    ```bash
    php artisan db:seed
    ```

6. **Build frontend assets**:

    ```bash
    npm run dev
    ```

7. **Start the application**:
    ```bash
    php artisan serve
    ```

---

## API Endpoints

### Public Endpoints

-   `GET /`: Home page

### Authenticated Endpoints

-   **Dashboard**:
    -   `GET /dashboard`: View all pizzas
-   **Cart**:
    -   `GET /cart`: View the cart
    -   `POST /cart`: Place an order
    -   `POST /cart/update`: Update cart items

### Admin Endpoints

-   **Pizzas**:
    -   `GET /pizzas`: View all pizzas
    -   `POST /pizzas`: Add a new pizza
    -   `PUT /pizzas/{id}`: Update a pizza
    -   `DELETE /pizzas/{id}`: Delete a pizza
    -   `POST /pizzas/manage`: Bulk create pizzas
    -   `PUT /pizzas/manage`: Bulk update pizzas

---

## Usage

### User Flow

1. Visit the homepage and log in or register an account.
2. Navigate to the dashboard to browse pizzas.
3. Add pizzas to the cart and adjust quantities as needed.
4. Place an order from the cart page.
5. View your profile and manage personal details.

### Admin Flow

1. Log in with admin credentials.
2. Access the pizza management dashboard to add, edit, or delete pizzas.
3. Use the bulk management interface for faster updates.

---

## Additional Information

### Database Schema

-   **Pizzas**:

    -   `id`: Integer (Primary Key)
    -   `name`: String
    -   `ingredients`: Text
    -   `price`: Decimal
    -   `image_url`: String

-   **Orders**:

    -   `id`: Integer (Primary Key)
    -   `user_id`: Foreign Key
    -   `total_price`: Decimal
    -   `status`: String

-   **Users**:
    -   Default Laravel User schema

### Error Handling

The application includes validation for inputs at both frontend and backend levels. Custom error messages are returned for invalid operations (e.g., empty cart during order placement).

---

Enjoy using the Pizza Shop application! 🍕
