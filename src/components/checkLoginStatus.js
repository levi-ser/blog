import axios from "axios";

export const checkLoginStatus = async (setLoggedIn) => {
  try {
    const response = await axios.get("http://localhost:5000/check_login", {
      withCredentials: true
    });
    if (response.status === 200) {
      setLoggedIn(true);
    }
  } catch (error) {
    setLoggedIn(false);
  }
};

export default checkLoginStatus;