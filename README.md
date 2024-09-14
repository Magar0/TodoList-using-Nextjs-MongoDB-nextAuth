# `Todo List using NextJs,NodeJs & MongoDB`

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [API Endpoints](#api-endpoints)

## General info
<img src="https://github.com/user-attachments/assets/c960d580-c3c4-4881-a79f-5b7db20aeabe" height="350" >

* Developed a feature-rich Todo App using the MERN stack (MongoDB, Express.js, Next.Js, Node.js)
* Developed a responsive platform accross all devices including mobiles & tablets.
* Enabled extensive user interaction with adding, editing ,deleting.
* Leveraged Node.js, Express.js and other technologies for a robust and scalable backend foundation.
* Employed Redux Toolkit for efficient state management and data flow.

## Technologies
* Next Js
* Tailwind CSS
* Redux Toolkit, Axios.
* Node JS., Express JS.
* Mongo DB
   
## Setup
1. Set up environment variables:
   - Create a `.env` file in the `client` directory.
   - Add the following variables to the `.env` file, replacing the placeholder values with your actual credentials:
     ```
     NEXT_PUBLIC_SERVER_URL="your backend URL"
     ```

   - Create a `.env` file in the `server` directory.
   - Add the following variables to the `.env` file, replacing the placeholder values with your actual credentials:
     ```
     PORT="port number on which you want to run" (default value "4000")
     MONGODB_URI="your_mongo_uri"
     ```
2. Install dependencies and run server:
#### Frontend
```
 cd ../client
 npm install
 npm start
```
#### Backend
```
cd ../server
npm install
npm start
```

## API Endpoints

## API Endpoints

| Endpoint | Description | Method | Request Body | Response Format (Example) |
|----------|-------------|--------|--------------|----------------------------|
| `/` | Welcome message | GET | None | JSON (message: string) |
| `/todo` | Get all Todo | GET | None | JSON (Todo List) |
| `/todo` | Create Todo | POST | None | JSON (Created Todo) |
| `/todo` | Edit Todo | PUT | `{ _id, title, description}` | JSON (message:string) | 
| `/todo` | Delete Todo | DELETE | `{id:String}` | JSON (message:string) |


