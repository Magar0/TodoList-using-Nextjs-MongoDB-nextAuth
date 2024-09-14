const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  email: null,
  username: null,
  imgLink: null,
  isLoggedIn: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload };
    },
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export default user.reducer;
export const { setUser, setLoggedIn } = user.actions;
