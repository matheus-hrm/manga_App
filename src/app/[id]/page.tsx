/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/footer";
import Link from "next/link";

const BASE_URL = "https://api.mangadex.org";
const UPLOADS_URL = "https://uploads.mangadex.org";

async function fetchCoverFiles(idImage: string, idManga: string) {
  const response = await axios.get(`${BASE_URL}/cover/${idImage}`);
  const fileName = response.data.data.attributes.fileName;
  return `${UPLOADS_URL}/covers/${idManga}/${fileName}.256.jpg`;
}

export default async function MangaPage({ params }) {
  const res = await fetch(`${BASE_URL}/manga/${params.id}`);
  const manga = await res.json();

  const imageUnresolved =
    manga.data.relationships.find((item) => item.type === "cover_art").id ||
    "sem imagem";
  const imageResolved = await fetchCoverFiles(imageUnresolved, params.id);

  const description =
    manga.data.attributes.description["pt-br"] ||
    manga.data.attributes.description["en"] ||
    "sem descrição";
  const title =
    manga.data.attributes.title["pt-br"] ||
    manga.data.attributes.title["en"] ||
    manga.data.attributes.title["ja-ro"] ||
    "sem título";

    const chaptersUnresolved = await fetch(`${BASE_URL}/manga/${params.id}/feed?translatedLanguage[]=pt-br&order[chapter]=desc&limit=500`);
    const chapters = await chaptersUnresolved.json();
    console.log(chapters); 
  return (
    <>
      <Header />
      <div className="mx-10 mt-4 flex justify-center overflow-hidden pt-4 text-white">
        <div className="">
          <img
            src={imageResolved}
            alt={manga.data.attributes.title.en}
            className="h-auto w-64 rounded-sm"
          />
          <div className="w-1/2 justify-between">
            <div className="mt-4 flex w-[256px] flex-col bg-slate-800">
              <div className="m-2 p-2">
                <div className="mb-2 flex justify-between">
                  <p className="text-sm">Status</p>{" "}
                  <p className="text-sm">{manga.data.attributes.status}</p>
                </div>
                <div className="mb-2 flex justify-between">
                  <p className="text-sm">Gênero</p>{" "}
                  <p className="text-sm">
                    {manga.data.attributes.publicationDemographic}
                  </p>
                </div>
                <div className="mb-2 flex justify-between">
                  <p className="text-sm">Ano</p>{" "}
                  <p className="text-sm">{manga.data.attributes.year}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Autor</p>{" "}
                  <p className="text-sm">
                    {
                      manga.data.relationships.map(
                        (item) => item.type === "author",
                      ).id
                    }
                  </p>
                </div>
                {/* <p className="text-sm">Gêneros: {manga.data.attributes.tags.map((item) => item.attributes.name["en"]).join(", ")}</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className=" p ml-5 h-[500px] w-[800px] rounded-sm bg-slate-800">
          <p className="m-4 py-1 text-xl font-extrabold">{title}</p>
          <p className="mb-4 ml-4 text-base text-slate-500">
            {manga.data.attributes.altTitles
              .slice(0, 3)
              .map((altTitle, index) => (
                <span key={index}>
                  {altTitle["ja-ro"] || altTitle["en"] || altTitle["pt-br"]}
                  {index < 2 ? " " : ""}
                </span>
              ))}
          </p>

          <p className="m-4 text-base font-bold">Sinopse de {title}</p>
          <p className="m-4 text-base">
            {description.split("--")[0].split("**")[0]}
          </p>
        </div>
      </div>
      <div className="flex px-12 items-center justify-center">
        <div className="mt-5 bg-slate-800 w-3/4 h-1/2">
          <div className="flex items-center">
            <p className="m-4 text-base font-bold">Capítulos</p>
          </div>
          {chapters.data.map((chapter) => 
            (
              <div key={chapter.id} className="flex items-center overflow-scroll">
                <p className="m-4 text-base font-bold">
                  {chapter.attributes.chapter}
                </p>
                <p className="m-4 text-base font-bold"> - </p> 
                <Link href={`${params.id}/${chapter.id}`}>
                <p className="m-4 text-base font-bold">
                  {chapter.attributes.title}
                </p>
                </Link>
              </div>
            )
          )}    
        </div>
      </div>

      <Footer />
    </>
  );
}
