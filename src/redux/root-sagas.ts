import { all, takeLatest } from "redux-saga/effects";
import {
  generateMnemonicsPhrase,
  getAllUsers,
  getUserAuthentication,
  registerUser,
} from "./users/usersSlice";
import {
  generateMnemonicsPhraseSaga,
  getAllUserWalletSaga,
  getUserAuthenticationSaga,
  registerUserSaga,
} from "./users/usersSaga";

function* watcherSaga() {
  yield takeLatest(getUserAuthentication, getUserAuthenticationSaga);
  yield takeLatest(registerUser, registerUserSaga);
  yield takeLatest(getAllUsers, getAllUserWalletSaga);
  yield takeLatest(generateMnemonicsPhrase, generateMnemonicsPhraseSaga);
}

export default function* rootSaga() {
  yield all([watcherSaga()]);
}
