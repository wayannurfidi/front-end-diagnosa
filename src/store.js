import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { auth } from "./config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.payload.error,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    dispatch({ type: "LOGIN_SUCCESS", payload: { user } });
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userEmail", email);
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: { error: error.message } });
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
