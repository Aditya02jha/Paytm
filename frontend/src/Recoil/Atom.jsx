import { selector } from "recoil";
import axios from "axios";
export const balanceSelector = selector({
  key: "balanceSelector",
  get: async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/account/balance",
        {
          token: localStorage.getItem("token"),
        }
      );
      return res.data.balance;
    } catch (e) {
      return e.message;
    }
  },
});

// module.exports = {
//     balanceSelector,
// }