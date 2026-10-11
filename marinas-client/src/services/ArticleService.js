import api from "../lib/api";

export const fetchArticles = () => api.get("/articles");
export const fetchArticleByName = (name) => api.get(`/articles/${name}`);
export const createArticle = (data) => api.post("/articles", data);
