# `Todo List using NextJs,NodeJs & MongoDB`

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [API Endpoints](#api-endpoints)

## General info
<img src="https://github.com/user-attachments/assets/c960d580-c3c4-4881-a79f-5b7db20aeabe" height="350" >

* Framework: Built using Next.js for server-side rendering and routing.
* Authentication: Integrated NextAuth for both OAuth (Google and GitHub) and custom email/password sign-in using a dedicated login page.
* State Management: Managed global state using Redux Toolkit for efficient data flow.
* Database: Used MongoDB with two collections: one for users and another for todos.
* API: Implemented CRUD operations (POST, GET, ADD, DELETE) via Next.js API routes with JWT verification from NextAuth.
* Fetching: Leveraged SWR for fetching todos data, ensuring efficient revalidation and caching.
* Debouncing: Implemented a debouncer to update the database and Redux store 1 second after typing, ensuring minimal database calls.
* Auto-sync: Changes to Todo (title, description) auto-update in both MongoDB and the Redux store without needing to refetch data.
* Search Feature: Included a search option to find todos by title or description.
* Responsive Design: Built with Tailwind CSS for mobile-first, responsive design across all devices.
* Forms: Used Formik for handling the sign-up and sign-in forms.

## Technologies
* Next Js
* Next Auth, SWR, Formik, JWT
* Tailwind CSS, Antd
* Redux Toolkit, Axios.
* Mongo DB
   
## Setup
1. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables to the `.env` file, replacing the placeholder values with your actual credentials:
     ```
     NEXT_PUBLIC_MONGODB_URI= your_mongo_uri + '/' + database
     NEXTAUTH_SECRET=secret

     GITHUB_ID= your_grithub_id
     GITHUB_SECRET= your_grithub_secret

     GOOGLE_ID= your_google_id
     GOOGLE_SECRET= your_google_secret
     ```
2. Install dependencies and run server:
#### Frontend
```
 npm install
 npm run dev
```

## API Endpoints

| Endpoint | Description | Method | Request Body | Response Format (Example) |
|----------|-------------|--------|--------------|----------------------------|
| `/todo` | Get all Todo | GET | None | JSON (Todo List) |
| `/todo` | Create Todo | POST | None | JSON (Created Todo) |
| `/todo` | Edit Todo | PUT | `{ _id, title, description}` | JSON (message:string) | 
| `/todo` | Delete Todo | DELETE | `{id:String}` | JSON (message:string) |


