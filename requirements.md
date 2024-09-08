

### Requirement 1: User Registration and Authentication
Number: R1

Statement: The system shall allow users to register, log in, and log out securely.

Evaluation Method: Verify that users can create an account, log in with valid credentials, and securely log out. Test for unauthorized access after logout.

Dependency: None

Priority: Essential

Requirement Revision History: 9/4/2024: Initial creation of user authentication requirement.




### Requirement 2: Track Expenses
Number: R2

Statement: The system shall allow users to input and categorize expenses with descriptions and amounts.

Evaluation Method: Ensure users can successfully add expense entries with required details such as amount, category, and description. Check for data validation (e.g., negative values).

Dependency: R1 (User Authentication)

Priority: Essential

Requirement Revision History: 9/4/2024: Created based on core functionality of tracking expenses.




### Requirement 3: Expense Categories
Number: R3

Statement: The system shall provide predefined categories (e.g., groceries, utilities) and allow users to add custom categories.

Evaluation Method: Verify that users can select predefined categories and create custom categories. Ensure expenses are assigned to categories.

Dependency: R2 (Track Expenses)

Priority: High

Requirement Revision History: 9/4/2024: Added requirement for custom expense categorization.




### Requirement 4: Display Expense History
Number: R4

Statement: The system shall display a list of past expenses with filters for date range, category, and amount.

Evaluation Method: Verify that users can view a list of past expenses and apply filters. Ensure filtered results match criteria.

Dependency: R2 (Track Expenses), R3 (Expense Categories)

Priority: High

Requirement Revision History: 9/4/2024: Created based on the need for users to analyze past expenses.




### Requirement 5: Monthly Budget Setting
Number: R5

Statement: The system shall allow users to set a monthly budget and notify them when they are close to exceeding it.

Evaluation Method: Test if users can set a budget and receive notifications or alerts when their expenses approach or exceed the set limit.

Dependency: R2 (Track Expenses)

Priority: Middle

Requirement Revision History: 9/4/2024: Created based on user feedback to track budget compliance.




### Requirement 6: Data Export
Number: R6

Statement: The system shall allow users to export their expense data in CSV format.

Evaluation Method: Ensure users can download a CSV file that contains their expense data, and verify the file's accuracy.

Dependency: R2 (Track Expenses), R4 (Display Expense History)

Priority: If time permits

Requirement Revision History: 9/4/2024: Created as an additional feature to provide more flexibility in data handling.




### Requirement 7: Mobile Responsiveness
Number: R7

Statement: The system shall be responsive and usable on both desktop and mobile devices.

Evaluation Method: Test the UI on different screen sizes (desktop, tablet, mobile) to ensure proper rendering and usability.

Dependency: None

Priority: High

Requirement Revision History: 9/4/2024: Added based on the requirement for cross-platform usage.





### Requirement 8: Secure Password Storage
Number: R8

Statement: The system shall securely store user passwords using encryption methods.

Evaluation Method: Ensure passwords are hashed and cannot be retrieved in plaintext from the database. Verify compliance with security best practices (e.g., bcrypt).

Dependency: R1 (User Authentication)

Priority: Essential

Requirement Revision History: 9/4/2024: Added based on security requirements for user data protection.




### Requirement 9: User Profile Management
Number: R9

Statement: The system shall allow users to manage their profile information (e.g., email, name, password).

Evaluation Method: Verify that users can update their personal information and that changes are reflected in the system.

Dependency: R1 (User Authentication)

Priority: Middle

Requirement Revision History: 9/4/2024: Added to provide profile customization functionality.








### Requirement 10: Dashboard with Analytics
Number: R10

Statement: The system shall provide a dashboard showing analytics, such as total monthly expenses, spending by category, and budget status.

Evaluation Method: Ensure the dashboard shows real-time analytics based on user data. Verify correctness of charts, graphs, and figures.

Dependency: R2 (Track Expenses), R3 (Expense Categories), R5 (Monthly Budget)

Priority: High

Requirement Revision History: 9/4/2024: Added for enhanced user insights into their financial data.