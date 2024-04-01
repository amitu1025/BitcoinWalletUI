import { all, takeLatest } from "redux-saga/effects";
import {
  getAllUsers,
  getUserAuthentication,
  registerUser,
} from "./users/usersSlice";
import {
  getAllUserWalletSaga,
  getUserAuthenticationSaga,
  registerUserSaga,
} from "./users/usersSaga";

function* watcherSaga() {
  yield takeLatest(getUserAuthentication, getUserAuthenticationSaga);
  yield takeLatest(registerUser, registerUserSaga);
  yield takeLatest(getAllUsers, getAllUserWalletSaga);
}

export default function* rootSaga() {
  yield all([watcherSaga()]);
}
