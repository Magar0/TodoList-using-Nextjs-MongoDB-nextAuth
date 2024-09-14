# `Todo List using NextJs,NodeJs & MongoDB`

* [Setup](#setup)
* [API Endpoints](#api-endpoints)

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 📲 [Download apk](#download-apk)
6. 🕸️ [Snippets](#snippets) 

## <a name="introduction">🤖 Introduction</a>

<img src="https://github.com/user-attachments/assets/c960d580-c3c4-4881-a79f-5b7db20aeabe" height="350" >


## <a name="tech-stack">⚙️ Tech Stack</a>

* Next Js
* Next Auth, Formik, JWT
* Axios , SWR
* Tailwind CSS, Antd
* Redux Toolkit.
* Mongo DB

## <a name="features">🔋 Features</a>

👉 **Framework**: Built using Next.js for server-side rendering and routing.

👉 **Authentication**: Integrated NextAuth for both OAuth (Google and GitHub) and custom email/password sign-in using a dedicated login page.

👉 **State Management**: Managed global state using Redux Toolkit for efficient data flow.

👉 **Database**: Used MongoDB with two collections: one for users and another for todos.

👉 **API**: Implemented CRUD operations (POST, GET, ADD, DELETE) via Next.js API routes with JWT verification from NextAuth.

👉 **Fetching**: Leveraged SWR for fetching todos data, ensuring efficient revalidation and caching.

👉 **Debouncing**: Implemented a debouncer to update the database and Redux store 1 second after typing, ensuring minimal database calls.

👉 **Auto-sync**: Changes to Todo (title, description) auto-update in both MongoDB and the Redux store without needing to refetch data.

👉 **Search Feature**: Included a search option to find todos by title or description.

👉 **Responsive Design**: Built with Tailwind CSS for mobile-first, responsive design across all devices.

👉 **Forms**: Used Formik for handling the sign-up and sign-in forms.


   
## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/Magar0/TodoList-using-Nextjs-MongoDB-nextAuth.git
cd TodoList-using-Nextjs-MongoDB-nextAuth
```
**Envirenment variables**

Set up environment variables:
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
     
**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm run dev
```


## API Endpoints

| Endpoint | Description | Method | Request Body | Response Format (Example) |
|----------|-------------|--------|--------------|----------------------------|
| `/todo` | Get all Todo | GET | None | JSON (Todo List) |
| `/todo` | Create Todo | POST | None | JSON (Created Todo) |
| `/todo` | Edit Todo | PUT | `{ _id, title, description}` | JSON (message:string) | 
| `/todo` | Delete Todo | DELETE | `{id:String}` | JSON (message:string) |


