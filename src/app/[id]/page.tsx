/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/footer";
import Link from "next/link";
import { Key } from "react";
type params = {
  params : {
    id: string,
    
  }
}
const BASE_URL = "https://api.mangadex.org";
const UPLOADS_URL = "https://uploads.mangadex.org";

async function fetchCoverFiles(idImage: string, idManga: string) {
  const response = await axios.get(`${BASE_URL}/cover/${idImage}`);
  const fileName = response.data.data.attributes.fileName;
  return `${UPLOADS_URL}/covers/${idManga}/${fileName}.256.jpg`;
}

export default async function MangaPage( {params}: params ) {
  const res = await fetch(`${BASE_URL}/manga/${params.id}`);
  const manga = await res.json();

  const imageUnresolved =
    manga.data.relationships.find((item: {type: string}) => item.type === "cover_art").id ||
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

  const chaptersUnresolved = await fetch(`${BASE_URL}/manga/${params.id}/feed?translatedLanguage[]=pt-br&order[chapter]=desc&limit=500` || `${BASE_URL}/manga/${params.id}/feed?translatedLanguage[]=en&order[chapter]=desc&limit=500`) 
  const chapters = await chaptersUnresolved.json();
  
  return (
    <>
      <Header />
      <div className="mx-10 mt-4 flex justify-center overflow-hidden pt-4 text-white">
        <div className="">
          <img
            src={imageResolved}
            alt={manga.data.attributes.title.en}
            className="h-auto w-64 rounded-sm mt-4"
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
                <div className="mb-1 flex justify-between">
                  <p className="text-sm">Ano</p>{" "}
                  <p className="text-sm">{manga.data.attributes.year}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="ml-5 h-[500px] w-[800px] rounded-sm bg-slate-800">
            <p className="m-4 py-3 text-xl font-extrabold">{title}</p>
            <p className="mx-4 text-base text-slate-500">
              {manga.data.attributes.altTitles
                .slice(0, 3)
                .map((altTitle: { [x: string]: string; }, index: number) => (
                  <span key={index}>
                    {altTitle["ja-ro"] || altTitle["en"] || altTitle["pt-br"]}
                    {index < 2 ? " " : ""}
                  </span>
                ))}
            </p>
            <div>

              <div className="flex flex-wrap mx-2 mt-1">
                {manga.data.attributes.tags.map((item: { id: string; attributes: {name: {[x: string]:string}}}) => (
                  <div key={item.id} className="m-2 bg-slate-700 rounded-sm p-2">
                    <p className="text-sm">{item.attributes.name["pt-br"] || item.attributes.name["en"] || item.attributes.name["ja-ro"]}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="m-4 text-base font-bold">Sinopse de {title}</p>
            <p className="m-4 text-base overflow-y-auto">
              {description.split("--")[0].split("**")[0]}
            </p>

          </div>

          <div className="ml-5 w-[800px] rounded-sm">
            <div className="mt-5 bg-slate-800 max-h-[400px] overflow-y-auto overflow-x-hidden" style={{ overflow: 'scroll', scrollbarWidth: 'thin', overflowX: 'hidden' }}>
              <style>

                {`
       
                  ::-webkit-scrollbar {
                    width: 10px;
                  }
        
                  ::-webkit-scrollbar-thumb {
                    background: #888;
                  }

        
                  ::-webkit-scrollbar-thumb:hover {
                    background: #555;
                  }
                `}

              </style>
              <div className="flex items-center">
                <p className="m-4 text-base font-bold">Capítulos de {title}</p>
              </div>
              {chapters.data.map((chapter: {id: string; attributes: {chapter: string; title: string}}) => (
                <div key={chapter.id} className="flex items-center border-[1px] mx-4 my-2 rounded-md ">
                  <Link href={`${params.id}/${chapter.id}`}>
                    <p className="mx-2 mt-2 text-base hover:text-[#776be0]">
                      Capítulo {chapter.attributes.chapter}
                    </p>
                    <p className="mx-2 mb-2 font-light text-xs">
                      {chapter.attributes.title}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>


        </div>

      </div>




      <Footer />
    </>
  );
}
