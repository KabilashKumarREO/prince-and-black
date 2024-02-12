import axios from "axios";
import { SERVER_URL } from "../config";

const serverApi = axios.create({
  baseURL: SERVER_URL,
});

export default serverApi;
