## 1. Overview
The Buck$ Expense Tracker application is designed to help users manage their finances by tracking expenses, setting budgets, and providing insights into spending habits. The system will provide user authentication, data storage, analytics, and a user-friendly interface. This design document provides a high-level view of the system architecture, outlining the major components, control flow, and interactions within the system.  
<br><br>


## 2. System Components

### 2.1 User Interface (UI)

Component Type: Frontend (React/TypeScript)
Description: The UI component is responsible for interacting with users. It provides forms for inputting expenses, setting budgets, and viewing analytics in a dashboard.


Major Components:
- Login Page: Handles user authentication.
- Overview: Displays the user's financial overview and analytics while supporting budget actions.
- Bucks Management Page: Allows users to add, delete, or modify categories.
- Expense Management Page: Allows users to add, categorize, and review expenses.
- Account Management Page: Allows users to add accounts through Plaid API and display connected bank accounts information.
- Notification Management Allows users to analyze notifications, read and delete them.


### 2.2 Backend API
Component Type: Backend (Django/Python)
Description: The API serves as the middleware, processing requests from the frontend and interacting with the database.


Major Components:
- Authentication Module: Manages user sessions and token-based authentication.
- Expense Processing Module: Handles expense creation, modification, deletion, and categorization.
- Budget Processing Module: Manages user budget data and triggers notifications when limits are exceeded.
- Buckets Processing Module: Handles bucket creation, modification, and deletion.



### 2.3 Database
Component Type: Database (PostgreSQL)
Description: Stores user data, including login credentials, expenses, budget data, buckets data, notifications, and analytics.


Tables:
- Users Table: Stores user authentication data.
- Expenses Table: Tracks expenses with fields for amount, category, description, and date.
- Budgets Table: Stores user-defined budget limits and associated spending.
- Buckets Table: Contains predefined and user-generated categories for organizing expenses.
- Notifications Table: stores predefined data based on actions on other entities.
- Account Table: stores predefined data coming from Plaid API.

<br><br>

## 3. Control Flow and Data Flow

### 3.1 User Authentication Flow
- Control Flow: The user logs into the system via the login page. The frontend sends credentials to the authentication API, which verifies the user via the authentication module. Upon success, a session token is issued.
- Data Flow: Credentials → Authentication API → Database (Users Table)


### 3.2 Expense Entry Flow
- Control Flow: The user enters an expense via the UI. The data is sent to the expense processing module in the backend, which stores it in the database and updates the user’s expense list.
- Data Flow: UI → Expense API → Database (Expenses Table)


### 3.3 Budget Management Flow
- Control Flow: Users set a monthly budget via the UI. The backend processes the budget data and stores it in the database. The system monitors expenses against this budget and triggers alerts if spending exceeds thresholds.
- Data Flow: UI → Budget API → Database (Budgets Table)




<br><br>

## 4. Hierarchical Component Structure

### Frontend (React/TypeScript):
- Landing Page
- Signup Page
- Login Page
- Overview Page
- Expense Management Page
- Bucket Management Page
- Account Management Page
- Notifications Page


### Backend (Django/Python):
- Authentication Module
- Expense Processing Module
- Budget Processing Module


### Database (PostgreSQL):
- Users Table
- Expenses Table
- Budgets Table
- Buckets Table
- Notifications Table
- Accounts Table


<br><br>

## 5. Interactions and Dependencies
The UI interacts with the backend via REST API calls, exchanging data between components.
The backend relies on MySQL to store and retrieve user data, expenses, budgets, and categories.
Dependencies exist between the Expense Processing Module and Analytics Module, as analytics rely on real-time expense data.


<br><br>

## 6. Priority Considerations
The authentication system is critical for securing user data.
Expense tracking and budget management are essential features and will be prioritized for the MVP (Minimum Viable Product).
Analytics and data export are not high-priority features, but can be added after core functionalities are completed.

<br><br>

## 7. Revisions
9/4/2024: Initial design created, outlining key components and control flow for MVP development.
