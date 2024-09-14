const { createSlice } = require("@reduxjs/toolkit");

const filteredTodos = createSlice({
  name: "filtered",
  initialState: [],
  reducers: {
    setFilteredTodos(state, action) {
      return action.payload;
    },
  },
});

export default filteredTodos.reducer;
export const { setFilteredTodos } = filteredTodos.actions;
