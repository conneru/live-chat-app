const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  // console.log("im in here");
  const response = await fetch("/users/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    // console.log(data);
    // if (data.errors) {
    //   return;
    // }

    dispatch(setUser(data));
  }
};

export const updateUser =
  (userId, username, profilePic) => async (dispatch) => {
    const response = await fetch("/users/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        username,
        profilePic,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dispatch(setUser(data));
    }
  };

export const logOut = () => async (dispatch) => {
  dispatch(removeUser());
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}
