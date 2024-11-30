# Installation Guide

Welcome to the installation guide for BUCK$. Follow these steps to set up the project on your system.

---

## **Prerequisites**

Before you begin, ensure you have the following installed:
1. **Python** (version 3.10 or higher) 
2. **Node.js** (version 16 or higher)
3. **Git** 
4. **MySQL**

---

## **Backend Installation**

1. Clone the repository:
   
   ```git clone https://github.com/your-username/your-repository.git ```
   
   cd your-repository/backend

2. Set up a virtual environment:


3. Install dependencies: pip install -r requirements.txt


4. Create a new MySQL database.


5. Update the DATABASES section in backend/settings.py with your database credentials.


6. Apply migrations with: python manage.py migrate


7. Run the server with: python manage.py runserver




## **Frontend Installation**
1. Navigate to the frontend directory with: cd codebase/frontend


2. Install dependencies with: npm install



3. Start the development server with: npm start



