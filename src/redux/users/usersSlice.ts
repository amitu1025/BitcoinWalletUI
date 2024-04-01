import { createSlice } from "@reduxjs/toolkit";

type User = {
  data: [] | null | undefined;
  isLoading: Boolean | null;
  errors: String | null;
  bearerToken: String | null | undefined;
  isAllUsersLoading: Boolean;
  allusers: [] | null;
  userResponseStatus: any;
  userResponseMessage: any;
  signupSuccessMsg: any;
};

const usersInitialState: User = {
  data: null,
  isLoading: false,
  errors: "",
  bearerToken: "",
  isAllUsersLoading: false,
  allusers: null,
  userResponseStatus: "",
  userResponseMessage: "",
  signupSuccessMsg: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    getUserAuthentication: (state, action) => {
      state.isLoading = true;
      state.errors = "";
    },
    registerUser: (state, action) => {
      state.isLoading = true;
      state.errors = "";
    },
    getRegisterUserSuccess: (state, action) => {
      state.isLoading = false;
      state.errors = "";
      state.signupSuccessMsg = action.payload?.message;
    },
    getRegisterUserError: (state, action) => {
      state.isLoading = false;
      state.errors = action?.payload?.message;
    },
    initUserInfo: (state) => {
      state.isLoading = true;
      state.errors = "";
    },
    initRegisterInfo: (state) => {
      state.isLoading = true;
      state.errors = "";
    },
    initForgotPassword: (state) => {
      state.isLoading = true;
      state.errors = "";
    },
    initResetPassword: (state) => {
      state.isLoading = true;
      state.errors = "";
    },
    getUserResponseInfo: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload.message;
    },
    getUserSuccessInfo: (state, action) => {
      const { token } = action.payload;
      state.isLoading = false;
      state.bearerToken = token;
      sessionStorage.setItem("token", token);
    },
    resetUserData: (state) => {
      state.data = null;
      state.bearerToken = "";
      state.errors = "";
      state.isLoading = false;
      state.userResponseMessage = "";
      state.userResponseStatus = "";
    },
    resetUserRegisterData: (state) => {
      state.errors = "";
      state.isLoading = false;
      state.userResponseMessage = "";
      state.userResponseStatus = "";
    },
    fetchAllUsers: (state) => {
      state.isLoading = true;
      state.errors = null;
    },
    fetchAllUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action?.payload;
    },
    fetchAllUsersFailure: (state, { payload: error }) => {
      state.isLoading = false;
      state.errors = error;
    },
    getAllUsers: (state) => {
      state.isAllUsersLoading = true;
      state.errors = "";
    },
    getAllUsersSuccess: (state, action) => {
      state.isAllUsersLoading = false;
      state.allusers = action?.payload;
    },
    getAllUsersError: (state, action) => {
      state.isAllUsersLoading = false;
      state.errors = action?.payload;
    },
    resetError: (state) => {
      state.errors = "";
      state.signupSuccessMsg = "";
    },
  },
});

export const {
  initUserInfo,
  initRegisterInfo,
  getUserResponseInfo,
  getUserSuccessInfo,
  resetUserData,
  resetUserRegisterData,
  fetchAllUsers,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
  getAllUsers,
  getAllUsersSuccess,
  getAllUsersError,
  initForgotPassword,
  initResetPassword,
  getUserAuthentication,
  registerUser,
  getRegisterUserSuccess,
  getRegisterUserError,
  resetError,
} = usersSlice.actions;

export default usersSlice.reducer;
