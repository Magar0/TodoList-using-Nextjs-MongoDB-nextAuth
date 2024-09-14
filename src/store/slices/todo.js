const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  todoList: [],
  currentTodoSelected: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoList(state, action) {
      state.todoList = action.payload;
    },
    setCurrentTodoSelected(state, action) {
      state.currentTodoSelected = action.payload;
    },
    deleteTodo(state, action) {
      const newList = state.todoList.filter(
        (ele) => ele._id !== action.payload,
      );
      return { todoList: newList, currentTodoSelected: newList[0] };
    },
    updateTitleDesc(state, action) {
      const { index, data } = action.payload;
      console.log(state.todoList.splice(index, 1, data));
      state.todoList.splice(index, 1, data);
    },
  },
});

export default todoSlice.reducer;
export const {
  setTodoList,
  setCurrentTodoSelected,
  deleteTodo,
  updateTitleDesc,
} = todoSlice.actions;
