import axios from "axios";
import { Article } from "./types";

interface UnsplashResponse {
  results: Article[];
}

export const fetchArticles = async (
  topic: string,
  currentPage: number
): Promise<Article[]> => {
  const response = await axios.get<UnsplashResponse>(
    `https://api.unsplash.com/search/photos`,
    {
      params: {
        query: topic,
        orientation: `landscape`,
        per_page: 9,
        page: currentPage,
        client_id: `rc7ikE3GSphGLM5Qt1Omx9WnfsXpe-T9hNq9IIBX2Pg`,
      },
    }
  );
  return response.data.results;
};
