import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todo";
import filteredTodos from "./slices/filtered";
import user from "./slices/user";

const store = configureStore({
  reducer: {
    todo: todoSlice,
    filteredTodos: filteredTodos,
    user: user,
  },
});

export default store;
