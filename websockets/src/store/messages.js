const SET_MESSAGES = "messages/SET_MESSAGES";
const ADD_MESSAGE = "messages/ADD_MESSAGE";
const DELETE_MESSAGE = "messages/DELETE_MESSAGE";

const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});
const addMsg = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});
const deleteMsg = (message) => ({
  type: DELETE_MESSAGE,
  payload: message,
});

const initialState = { messages: null };

export const getMessages = (roomId) => async (dispatch) => {
  const response = await fetch(`/message/${roomId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(setMessages(data));
    return true;
  }
};

export const deleteMessage = (msgId) => async (dispatch) => {
  const response = await fetch(`/message/${msgId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    dispatch(deleteMsg(data));
  }
};

export const addMessage =
  (content, userId, roomId, username) => async (dispatch) => {
    const response = await fetch("/message/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        userId,
        roomId,
        username,
      }),
    });
    if (response.ok) {
      const data = await response.json();

      dispatch(addMsg(data));
    }
  };

// export const getMsgUser = (userId) => async (dispatch) => {
//   const response = await fetch(`/users/${userId}`);
//   if (response.ok) {
//     const data = await response.json();

//     dispatch(addMsg(data));
//   }
// };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return { messages: action.payload };
    case ADD_MESSAGE:
      return { ...state, messages: [action.payload, ...state.messages] };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages.filter((msg) => action.payload !== msg._id),
        ],
      };

    default:
      return state;
  }
}
