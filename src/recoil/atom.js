import { atom, selector } from "recoil";
import axios from "axios";

export const getUserName = selector({
    key: 'getUserName',
    get: async () => {
        if(localStorage.getItem("token")) {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/islogin`,{
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            return response.data.email
        }
    }
});