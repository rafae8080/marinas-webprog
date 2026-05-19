import axios from "axios";
import constants from "../constants";

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

export const fetchArticles = () => API.get("/");
export const fetchArticleByName = (name) => API.get(`/${name}`);
export const createArticle = (data) => API.post("/", data);
