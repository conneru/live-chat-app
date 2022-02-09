const SET_CHATS = "chats/SET_CHATS";
const GET_CHATS = "chats/GET_CHATS";
const JOIN_CHAT = "chats/JOIN_CHAT";
const CREATE_CHAT = "chats/CREATE_CHAT";
const DELETE_CHAT = "chats/DELETE_CHAT";
const UPDATE_CHAT = "chats/UPDATE_CHAT";

const setChats = (chats) => ({
  type: SET_CHATS,
  payload: chats,
});
const updateChats = (chat) => ({
  type: UPDATE_CHAT,
  payload: chat,
});
const getAChats = (chats) => ({
  type: GET_CHATS,
  payload: chats,
});
const joinAChat = (chat) => ({
  type: JOIN_CHAT,
  payload: chat,
});
const createAChat = (chat) => ({
  type: CREATE_CHAT,
  payload: chat,
});
const deleteAChat = (chat) => ({
  type: DELETE_CHAT,
  payload: chat,
});

const initialState = { chats: null, allChats: null };

export const getChats = (userId) => async (dispatch) => {
  const response = await fetch(`/chat/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(setChats(data));
  }
};
export const deleteChat = (roomId) => async (dispatch) => {
  const response = await fetch(`/chat/${roomId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(deleteAChat(data));
  }
};
export const getAllChats = (userId) => async (dispatch) => {
  const response = await fetch(`/chat/all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(getAChats(data));
  }
};

export const joinChat = (chatId, user) => async (dispatch) => {
  const response = await fetch("/chat/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatId,
      user,
    }),
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(joinAChat(data));
  }
};

export const createChat = (name, user) => async (dispatch) => {
  const response = await fetch("/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      user,
    }),
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(createAChat(data));
  }
};

export const updateChat =
  (roomId, name, profilePic, userId) => async (dispatch) => {
    const response = await fetch("/chat/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId,
        name,
        profilePic,
        userId,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(updateChat(data));
      return data;
    }
  };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHATS:
      return { ...state, chats: action.payload };
    case GET_CHATS:
      return { ...state, allChats: action.payload };
    case JOIN_CHAT:
      return {
        ...state,
        allChats: [
          ...state.allChats.filter((chat) => chat._id !== action.payload._id),
        ],
        chats: [...state.chats, action.payload],
      };

    case CREATE_CHAT:
      return { ...state, chats: [...state.chats, action.payload] };
    case DELETE_CHAT:
      return {
        ...state,
        chats: [...state.chats.filter((chat) => chat._id !== action.payload)],
      };
    case UPDATE_CHAT:
      return {
        ...state,
        chats: [...state.chats.filter((chat) => chat._id !== action.payload)],
      };

    default:
      return state;
  }
}
