import axios from "axios";

const BASE_URL = "https://api.mangadex.org";
type MangaData = {
  data: [
    {
      id: string;
      type: string;
      attributes: {
        title: {
          "pt-br": string;
          en: string;
          "ja-ro": string;
        };
      };
    },
  ];
};


export default async function searchManga(query: string) {
  const response = await axios.get<MangaData>(`${BASE_URL}/manga?title=${query}`, 
  {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  const data = response.data;
  
  if (data) {
    const mangaData = data.data.map((manga) => ({
      id: manga.id,
      title: manga.attributes.title.en,
    }));
    return mangaData;
  }
}
