Personal Expense Tracker API
This is a Node.js RESTful API for managing personal financial records using SQLite. Users can add transactions (income or expenses), retrieve them, update, and delete transactions, as well as get a summary of their finances.

Technologies Used
Backend Framework: Node.js with Express.js
Database: SQLite
Setup and Run Instructions
1. Clone the repository

git clone https://github.com/your-username/personal-expense-tracker.git
cd personal-expense-tracker
2. Install the required dependencies

npm install
3. Initialize the SQLite database
SQLite will automatically create the database when you first run the application.

4. Run the server

npm start
This starts the server at http://localhost:5000.

5. API Testing
You can use Postman or any other API testing tool to test the endpoints listed below.

Database Structure
Transactions Table
id: Primary key, auto-increment.
type: The type of transaction, either 'income' or 'expense'.
category_id: Foreign key to categories table.
amount: Amount of the transaction (a floating-point number).
date: The date of the transaction (format: YYYY-MM-DD).
description: Text description of the transaction.

Categories Table
id: Primary key, auto-increment.
name: Category name (e.g., Rent, Groceries).
type: Either 'income' or 'expense'.
API Endpoints
1. Add a new transaction
POST /transactions

Request Body:


{
  "type": "income",
  "category_id": 1,
  "amount": 1500,
  "date": "2024-10-22",
  "description": "October Salary"
}
Response:


{
  "message": "Transaction added successfully",
  "transaction": {
    "id": 1,
    "type": "income",
    "category_id": 1,
    "amount": 1500,
    "date": "2024-10-22",
    "description": "October Salary"
  }
}
2. Retrieve all transactions
GET /transactions

Response:


{
  "message": "Get All Transaction successfully",
  "transactions": [
    {
      "id": 1,
      "type": "income",
      "category_id": 1,
      "amount": 1500,
      "date": "2024-10-22",
      "description": "October Salary"
    },
    {
      "id": 2,
      "type": "expense",
      "category_id": 2,
      "amount": 200,
      "date": "2024-10-22",
      "description": "Groceries"
    }
  ]
}
3. Retrieve a transaction by ID
GET /transactions/:id

Response:


{
  "message": "Get By Id Transaction successfully",
  "transaction": {
    "id": 1,
    "type": "income",
    "category_id": 1,
    "amount": 1500,
    "date": "2024-10-22",
    "description": "October Salary"
  }
}
4. Update a transaction by ID
PUT /transactions/:id

Request Body:


{
  "type": "expense",
  "category_id": 2,
  "amount": 500,
  "date": "2024-10-23",
  "description": "Updated transaction"
}
Response:


{
  "message": "Transaction updated successfully"
}
5. Delete a transaction by ID
DELETE /transactions/:id

Response:


{
  "message": "Transaction deleted successfully"
}
6. Retrieve a summary of transactions (total income, total expenses, and balance)
GET /summary

Response:


{
  "total_income": 1500,
  "total_expense": 200,
  "balance": 1300
}
Error Handling
The API handles common errors, such as:

400: Bad request (invalid input).
404: Transaction not found.
500: Internal server error.