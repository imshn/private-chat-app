import axios from "axios";

export const getMessages = async (from, to) => {
  try {
    let res = await axios.get(
      `http://localhost:8080/chat/messages/${from}/${to}`,
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (e) {
    return e;
  }
};
