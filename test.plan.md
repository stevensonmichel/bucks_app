### TEST PLAN


## 1. Overview
This document outlines the testing approach for the BUCKS Expense Tracker application. The objective of this test plan is to verify that the key functionalities of the application work as intended and meet the project requirements. Testing activities will include unit testing, integration testing, and user interface testing to ensure the reliability of the tracker features, such as adding expenses, tracking different buckets (e.g., Transportation, Groceries), and maintaining user data integrity across sessions.

The testing strategy will involve both manual and automated testing where applicable. Manual testing will focus on user experience and boundary cases, while automated tests will cover the core functionalities, such as form validations, API calls, and state management.

## 2. Key Test Cases
Each key test case represents a specific user interaction or functionality to be tested within the application. Below is the list of test cases with descriptions, preconditions, steps, and expected results.


<br><br>


# Test Case 1: Add a New Expense
Requirement: The user should be able to add a new expense under a selected category.
Preconditions: The user must be logged into the app, and the expense categories (buckets) must be available.
Steps:
- Navigate to the Expenses section.
- Click the Add Expense button.
- Enter the expense details: amount, description, category (e.g., Groceries), and date.
Click Submit.
- Desired Results: The new expense should appear under the chosen category in the Buckets section, and the total expenses should update accordingly.


<br><br>

# Test Case 2: Edit an Existing Expense
Requirement: The user should be able to edit an existing expense.
Preconditions: The user must have at least one expense entered into the tracker.
Steps:
- Navigate to the Expenses section.
- Select an existing expense to edit.
- Modify the details, such as changing the amount or category.
- Click Save.
Desired Results: The selected expense should reflect the updated values, and the associated bucket totals should adjust accordingly.



# Test Case 3: Delete an Expense
Requirement: The user should be able to delete an expense.
Preconditions: The user must have at least one expense entered into the tracker.
Steps:
- Navigate to the Expenses section.
- Select an expense to delete.
- Click the Delete icon.
- Confirm the deletion.
- Desired Results: The expense should be removed from the list, and the total for the associated category should decrease by the amount of the deleted expense.



# Test Case 4: View Summary of Expenses
Test Case ID: TC004
Requirement: The user should be able to view a summary of expenses under each category.
Preconditions: The user must have expenses recorded in multiple categories.
Steps:
- Navigate to the Overview section.
- Review the summary of expenses under Buckets.
Desired Results: The summary should show the total expenses and remaining balance for each category.



# Test Case 5: Persistent Data After Logout
Requirement: All user data (expenses, categories, etc.) should persist after logging out and back into the app.
Preconditions: The user must be logged in and have added expenses.
Steps:
- Log out of the app.
- Log back in with the same account.
Desired Results: All previously entered data, including expenses and categories, should be retained after logging back in.
