# Coffee Project

This repository contains the code for the **Coffee** project. The project is designed to manage a coffee ordering system where users can place orders, view the menu, and track their orders.

## Features

- User Authentication (Signup, Login, Logout)
- Menu Management (Add, Edit, Delete Coffee Items)
- Place Orders
- View Order History
- Review and Rating System for Coffee

## Technologies Used

- **Frontend**: React.js, Bootstrap (for styling)
- **Backend**: Django, Django REST Framework
- **Database**: SQLite (or MySQL, depending on your setup)
- **Version Control**: Git, GitHub

## Installation

To run this project locally, follow the steps below:

### Prerequisites

- Python 3.x
- Django
- Node.js
- React.js
- Git

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/12a15darshangohil/coffee.git
    ```

2. Navigate into the project directory:

    ```bash
    cd coffee
    ```

3. Install backend dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Install frontend dependencies:

    ```bash
    cd frontend
    npm install
    ```

5. Run Django migrations to set up the database:

    ```bash
    python manage.py migrate
    ```

6. Start the Django server:

    ```bash
    python manage.py runserver
    ```

7. In a separate terminal, start the React development server:

    ```bash
    cd frontend
    npm start
    ```

8. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

- Sign up or log in to the system.
- Browse through the coffee menu.
- Add items to your cart and place an order.
- Track your order and leave a review after completion.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.
