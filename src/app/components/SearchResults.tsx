import searchManga from "../api/apiSearch";
import Link from "next/link";

type InputQuery = {
  input: string;
};

type MangaData = {
  id: string;
  title: string;
}[];

async function getSearchResponse(query: InputQuery) {
  const data = (await searchManga(query.input)) as MangaData;
  return data;
}

export default async function SearchResults({ input: query }: InputQuery) {
  const results = await getSearchResponse({ input: query });

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
