import axios from "axios";

export const fetchAllUsers = async () => {
  try {
    let res = await axios.get("http://localhost:8080/users/", {
      withCredentials: true,
    });
    return res;
  } catch (e) {
    return e;
  }
};
export const getUser = async (id) => {
  try {
    let res = await axios.get("http://localhost:8080/users/"+id, {
      withCredentials: true,
    });
    return res;
  } catch (e) {
    return e;
  }
}
export const login = async (formData) => {
  try {
    let res = await axios.post("http://localhost:8080/users/login", formData, {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const register = async (formData) => {
  try {
    let res = await axios.post(
      "http://localhost:8080/users/register",
      formData,
      { withCredentials: true }
    );
    return res;
  } catch (e) {
    return e;
  }
};
