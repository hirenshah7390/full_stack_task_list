# full_stack_task_list
Task management System
The application has 2 isolated projects for front and back-end.The application is not entirely complete. 

The main focus was to build  well architecture and then add functionalities.

For fron-end project Client folder has all code. I have used below technology to build front-end:

      1. React-redux and npm 
      2. javascript ES-6
      3. babel tranpiling
      4. webpack
      5. eslint

To start the front end proejct please follow below step.
   1. Go inside the client folder.
   2. run npm install from terminal
   3. run npm start   from terminal  
The application will start on port 3000

The back-end system is build below tech stack
    1. Java
    2. spring-boot and data JPA, spring security.
    3. Mysql on AWS RDS.
    4. JWT    
The database is up and running all the time on AWS.
To start backend server Please follow below step
   1. Go inside server/task folder
   2. run mvn spring-boot:run
The server will start on port 5000.

The back-end app has mainly 2 Entity User and Task. User entity is coupled with spring security and JWT for tokens and authentication. It includes below endpoints.
    
   1. For Signup:- http://localhost:5000/api/auth/signup :- Register new user
   2. For signIn:- http://localhost:5000/api/auth/signin :- Login for user
   3. For New Task:- http://localhost:5000/api/tasks    :- Creates new task
   4. For User Tasks:- http://localhost:5000/api/users/{username}/userTasks :- get all task assigned to this username
   
   Below are the core tables in the database
   
   1. Role:- all roles
   2. users:- all users
   3. task_template:- template to form a task
   4. tasks:- all tasks
   5. task_users:- list of all users assigned for each task
