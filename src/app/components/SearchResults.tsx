
import axios from "axios";
import Link from "next/link";

type InputQuery = {
  input: string;
};

type MangaData = {
  id: string;
  title: string;
}[];

const BASE_URL = "https://api.mangadex.org";
type UnresolvedMangaData = {
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

export async function searchManga(query: string) {
  const response = await axios.get<UnresolvedMangaData>(`${BASE_URL}/manga?title=${query}`, 
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
    return mangaData as MangaData;
  }
}


export default async function SearchResults({ input: query }: InputQuery) {
  const results = await searchManga(query);

  return (
    <div className="absolute left-0 top-full z-10 mt-2 flex  w-full text-white sm:w-3/4 lg:w-full">
      <div className="max-h-96 w-full max-w-lg flex-col space-y-4 overflow-auto rounded-md border-2 border-white bg-opacity-70  p-5 backdrop-blur-3xl">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-semibold">Resultados</h1>
        </div>
        { results &&
          <ul className="text-base">
            {results.map((manga: { id: string; title: string }, index) => (
              <li key={index} className="p-2 text-sm">
                <Link href={`/${manga.id}`}>
                  <h2>{manga.title}</h2>
                </Link>
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}
