import axios from "axios";
import { toast } from "react-toastify";

// const sleep = (delay: number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// };

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

agent.interceptors.response.use(
  async (response) => {
    return response;
},

async error => {
  const {status, config} = error.response || {};
  const endpoint = config?.url || "Unknown endpoint";

  console.log(error);
  switch (status) {
    case 400:
      toast.error('Bad Request: ' + endpoint );
      break;
    case 401:
      toast.error('Unauthorized: '  + endpoint);
      break; 
    case 404:
      toast.error('Not found.: '  + endpoint);
      break;
    case 500:
      toast.error('Server error.: ' + endpoint);
      break;
    default:
      break;
  }
}
);

export default agent;
