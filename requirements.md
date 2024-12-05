
##### REQUIREMENTS


### Requirement 1: User Registration and Authentication
- Number: R1

- Statement: The system should allow users to register, log in, and log out securely.

- Evaluation Method: Verify that users can create an account, log in with valid credentials, and securely log out. Test for unauthorized access after logout.

- Dependency: None

- Priority: Essential

- Requirement Revision History: 9/8/2024: Initial creation of user authentication requirement.



### Requirement 2: Track Expenses
- Number: R2

- Statement: The system should allow users to categorize expenses with descriptions and amounts.

- Evaluation Method: Ensure users can successfully add expense entries with required details such as amount, category, and description. Check for data validation (e.g., negative values).

- Dependency: R1 (User Authentication)

- Priority: Essential

- Requirement Revision History: 9/8/2024: Created based on core functionality of tracking expenses.



### Requirement 3: Expense Categories
- Number: R3

- Statement: The system shall provide predefined categories (e.g., groceries, utilities) and allow users to add custom categories.

- Evaluation Method: Verify that users can select predefined categories and create custom categories. Ensure expenses are assigned to categories.

- Dependency: R2 (Track Expenses)

- Priority: High

- Requirement Revision History: 9/8/2024: Added requirement for custom expense categorization.



### Requirement 4: Monthly Budget Setting
- Number: R4

- Statement: The system shall allow users to set a monthly budget and notify them when they are close to exceeding it.

- Evaluation Method: Test if users can set a budget and receive notifications or alerts when their expenses approach or exceed the set limit.

- Dependency: R2 (Track Expenses), R3 (Expenses Categories)

- Priority: High

- Requirement Revision History: 9/4/2024: Created based on user feedback to track budget compliance.



### Requirement 5: Plaid API Connection
- Number: R5

- Statement: The system shall allow users connect to any of their bank account. Plaid API will be used for the testing stage.

- Evaluation Method: Test if users can connect their bank account, and have automation for populating expenses and buckets.

- Dependency: R2 (Track Expenses), R3 (Expenses Categories)

- Priority: High

- Requirement Revision History: 9/4/2024: Created based on need for users to automate processes of recording expenses.


### Requirement 6: Display Notifications
- Number: R6

- Statement: The system shall display a list of notifications related to additions of buckets, expenses, accounts, and budgets.

- Evaluation Method: Verify that if any of these entities are created, namely buckets, expenses, accounts, or budgets, there is a notification created for each of them

- Dependency: R2 (Track Expenses), R3 (Expense Categories), R4 (Monthly Budget)

- Priority: Mid

- Requirement Revision History: 9/4/2024: Created based on the need for users to analyze recent actions in the application.



### Requirement 7: Secure Password Storage
- Number: R7

- Statement: The system shall securely store user passwords using encryption methods.

- Evaluation Method: Ensure passwords are hashed and cannot be retrieved in plaintext from the database. Verify compliance with security best practices (e.g., bcrypt).

- Dependency: R1 (User Authentication)

- Priority: Essential

- Requirement Revision History: 9/8/2024: Added based on security requirements for user data protection.



### Requirement 8: User Profile Management
- Number: R8

- Statement: The system shall allow users to manage their profile information (e.g., email, name, password).

- Evaluation Method: Verify that users can update their personal information and that changes are reflected in the system.

- Dependency: R1 (User Authentication)

- Priority: Middle

- Requirement Revision History: 9/8/2024: Added to provide profile customization functionality.



