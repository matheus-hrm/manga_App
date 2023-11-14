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


export async function GET(request: Request, {query}: {query: string}){
  const response = await fetch(`${BASE_URL}/manga?title=${query}`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const data = await response.json() as MangaData;
  
  if (data) {
    const mangaData = data.data.map((manga) => ({
      id: manga.id,
      title: manga.attributes.title.en,
    }));
  return Response.json(mangaData);
  }
}

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
