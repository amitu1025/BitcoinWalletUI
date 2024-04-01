import baseApi from "../../app/api";
import { call, put } from "redux-saga/effects";
import {
  getAllUsersError,
  getAllUsersSuccess,
  getRegisterUserError,
  getRegisterUserSuccess,
  getUserResponseInfo,
  getUserSuccessInfo,
} from "./usersSlice";

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

// Generator function
export function* getUserAuthenticationSaga(action: any) {
  try {
    const { mnemonic, username, password } = action.payload;
    const response: ResponseGenerator = yield call(() =>
      baseApi.post("login", { mnemonic, username, password })
    );
    yield put(getUserSuccessInfo(response.data));
  } catch (error: any) {
    yield put(
      getUserResponseInfo({
        type: "error",
        message: error.response?.data?.error,
      })
    );
  }
}

export function* registerUserSaga(action: any) {
  try {
    const { firstname, lastname, username, password } = action.payload;
    const response: ResponseGenerator = yield call(() =>
      baseApi.post("register", { firstname, lastname, username, password })
    );
    yield put(getRegisterUserSuccess(response.data));
  } catch (error: any) {
    yield put(
      getRegisterUserError({
        type: "error",
        message: error.response?.data?.error,
      })
    );
  }
}

export function* getAllUserWalletSaga(action: any) {
  try {
    const response: ResponseGenerator = yield call(() =>
      baseApi.get("getallusers")
    );
    yield put(getAllUsersSuccess(response?.data));
  } catch (error) {
    yield put(getAllUsersError(error));
  }
}

export function* forgotPwdSaga(action: { payload: { email: any } }) {
  try {
    const { email } = action.payload;
    const response: ResponseGenerator = yield call(() =>
      baseApi.post("forgotpwd", { usr_email_id: email })
    );
    if (response && response.status === 200) {
      yield put(
        getUserResponseInfo({
          type: "success",
          message: response.data.meta.message,
        })
      );
    }
  } catch (error: any) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.meta &&
      error.response.data.meta.message
    ) {
      yield put(
        getUserResponseInfo({
          type: "error",
          message: error.response.data.meta.message,
        })
      );
    }
  }
}

export function* resetPwdSaga(action: {
  payload: { token: any; password: any; confirm_password: any };
}) {
  try {
    const { token, password, confirm_password } = action.payload;
    const response: ResponseGenerator = yield call(() =>
      baseApi.post("resetpwd", {
        token,
        usr_password: password,
        usr_confirmpwd: confirm_password,
      })
    );
    if (response && response.status === 200) {
      yield put(
        getUserResponseInfo({
          type: "success",
          message: response.data.meta.message,
        })
      );
    }
  } catch (error: any) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.meta &&
      error.response.data.meta.message
    ) {
      yield put(
        getUserResponseInfo({
          type: "error",
          message: error.response.data.meta.message,
        })
      );
    }
  }
}

export function* logoutUserSaga() {
  yield call(removeItemsFromSessionStorage);
}

function removeItemsFromSessionStorage() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
}
