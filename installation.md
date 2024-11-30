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
   
   ``` git clone https://github.com/CSC493-Computing-Design-Practicum/csc493-cdp-stevensonmichel.git ```
   
   ``` cd csc493-cdp-stevensonmichel.git/backend ```

2. Set up a virtual environment: 

    ``` python -m venv yourvirtualenvironment ```
    ``` source yourvirtualenvironment/bin/activate ```


3. Install dependencies: 

    ``` pip install -r requirements.txt ```


4. Create a new MySQL database.

    - Access MySQL CLI:

    ``` mysql -u root -p ```

    - Replace root with your MySQL username, if different.

    - Enter your MySQL password when prompted.

    - Create your database
        ``` CREATE DATABASE IF NOT EXISTS project_db; ```

        ``` USE project_db; ```

        ``` CREATE USER IF NOT EXISTS 'project_user'@'localhost' IDENTIFIED BY 'password'; ```

        ``` GRANT ALL PRIVILEGES ON project_db.* TO 'project_user'@'localhost'; ```

        ``` FLUSH PRIVILEGES; ```


5. Update the DATABASES section in ``` backend/bucks/settings.py ``` with your database credentials.

    ``` DATABASES = { ```
        ``` 'default': { ``` 
            ``` 'ENGINE': 'django.db.backends.mysql', ```
            ``` 'NAME': 'project_db', ```
            ``` 'USER': 'project_user', ```
            ``` 'PASSWORD': 'password', ```
            ``` 'HOST': 'localhost', ```
            ``` 'PORT': '3306', ```
        ``` } ```
    ``` } ```


6. Apply migrations:

    ``` python manage.py makemigrations ```

    ``` python manage.py migrate ```


7. Run the server backend server: 

    ``` python manage.py runserver ```




## **Frontend Installation**

1. Navigate to the frontend directory: 

    ``` cd codebase/frontend ```


2. Install dependencies: 

    ``` npm install ```


3. Start the development server with: npm start



