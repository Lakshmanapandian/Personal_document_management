# Personal_document_management
# Title

Personal document management

# Description

Personal document management (PDM):
Personal document management  (PDM) is the used  store your files safely and access them from any device.

# General Information

1.  PDM iis the used  to  store your files safely and access them from any device.

2.  PDM  solution creates a central location to capture and store your organization's document-centric information. This makes finding current versions of documents and information much easier, and allows workers to focus on their roles rather than hunting down pieces of paper

# Project structure

    AdminLogin---> -User details
              - Add user
              -Remove user
              - Administration-->- OTP validation
                                 - Add New Files
                                 - Manage document
                                 -  Delete files in Local directory
                                 -  Download files  from Local directory
                                 -  Rename files in Local directory
                                 -Delete files in Database
                                 -  Rename files in database
                                 - Logout

# How to use the project

1.  First you have to login to the PDM  software with your credendials like username and password.

2.  My account --> You can see the details of logged in user and here you can edit user profile.

3.  Add user --> you can add the admin user if you want.

4.  Add Files --> Add the files  to local folder and store the file details in database.

5.  Manage Document --> Manage the files like download file,delete file,rename file.

6.  Download --> Download the file using path and filename in database .

7.   delete --> Delete the file using path and filename and store the files in user's folder.

8.  Rename-->Rename the file Using path and filename and rename the file in local and update in database

9.  Add insurance --> Add the insurance details to the particular vehicle.
10.  
# Install and run it locally

1.  Download or clone the repository to your local machine:

    $ git clone https://github.com/Lakshmanapandian/Personal_document_management

2.  Run npm install inside the downloaded/cloned folder:

    $ npm install

3.  Start the dev server by running the command below. Navigate to http://localhost:4200/.
    The app will automatically reload if you change any of the source files.

    $ npm test

# Features

1. Session Handling(login and logout) in angular level.
2. DB Connectivity.
3. DB Relational data Handling.
   Lookup relation.
   One to many relation.
4. Exception Handling with try and catch.
5. Promise with resolve and resolve.
6. Avoing Double time Click save.
7. Logger.
8. Loggic Handling.
9. Form validation in frontend level.
10. Toastr for alert message.
11. Automatically refresh table content.
12. Dynamic dashboard.

# Technology

# Frontend:

1. Angular-cli - 11.0.0
2. Bootstrap - 5.1.3
3. ng2-search-filter -0.5.1
4. ngx-toastr -13.2.1
5. Angular material

# Backend

1. NodeJs : 14.14.0

# NPM

command to install: npm install npm-package_name

1. "body-parser": "^1.20.0",
2. "cors": "^2.8.5",
3. "express": "^4.18.1",
4. "nano": "^10.0.0",
5. "winston": "^3.7.2"

# Database

1. cloudant
