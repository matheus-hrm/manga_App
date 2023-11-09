import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";

type params = {
  params: {
    id: string,
  }
}

type attributes = {
  fileName: string
}

type CoverData = {
  attributes: attributes
  data: {
      id: string
      type: string
      attributes: attributes;
      relationships: [
          {
              id: string
              type: string
          }
      ]
  }
}

type MangaData = {
  id: string
  type: string
  attributes: {
    title: {
        "pt-br": string
        en: string
        "ja-ro": string
    }
    altTitles: [
        {
          en: string
          "ja-ro": string
          "pt-br": string
        }
    ]
    description: {
      en: string
      "pt-br": string
    }
    publicationDemographic: string
    status : string
    year: number
    contentRating: string
    tags: [
      {
        id: string
        type: string
        attributes: {
          name: {
            en: string
            "ja-ro": string
            "pt-br": string
          }
        }
        relationships: []
      }
    ]
  }
  relationships: [
    {
      id: string
      type: string
    }
  ]
}

type ChapterData = {
  id: string
  type: string
  attributes: {
    chapter: string
    title: string
    volume: string
    translatedLanguage: string
    hash: string
    data: string[]
    publishAt: string
    createdAt: string
    updatedAt: string
  }
  relationships: [
    {
      id: string
      type: string
    }
  ]
}
type MangaResponse = {
  data: MangaData
}


type CoverResponse = {
  data: CoverData  
}

const BASE_URL = "https://api.mangadex.org";
const UPLOADS_URL = "https://uploads.mangadex.org";

async function fetchCoverFiles(idImage: string, idManga: string) {
  const response = await axios.get<CoverResponse>(`${BASE_URL}/cover/${idImage}`)
  if (response.data){
      const fileName: string = response.data.data.attributes.fileName 
      return `${UPLOADS_URL}/covers/${idManga}/${fileName}.512.jpg`
  } else {
      throw new Error("Não foi possível obter a imagem")
  }
}

export default async function MangaPage({ params }: params) {
  const res = await fetch(`${BASE_URL}/manga/${params.id}`);
  const manga = await res.json() as MangaResponse;
  
  const coverArtRelationship = manga.data.relationships.find((item: {type: string}) => item.type === "cover_art");
  const imageUnresolved: string = coverArtRelationship ? coverArtRelationship.id || ("sem imagem") : ("sem imagem");
  const imageResolved = await fetchCoverFiles(imageUnresolved, params.id);

  const description =
    manga.data.attributes.description["pt-br"] ||
    manga.data.attributes.description.en ||
    "sem descrição";
  const title =
    manga.data.attributes.title["pt-br"] ||
    manga.data.attributes.title.en ||
    manga.data.attributes.title["ja-ro"] ||
    "sem título";

  const chaptersUnresolved = await fetch(`${BASE_URL}/manga/${params.id}/feed?translatedLanguage[]=pt-br&order[chapter]=desc&limit=500` 
  || `${BASE_URL}/manga/${params.id}/feed?translatedLanguage[]=en&order[chapter]=desc&limit=500`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accesss-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    },
  })
  const chapters = await chaptersUnresolved.json() as { data: ChapterData[] };

  return (
    <>
      <Header />
      <div>
        <Image
          src={imageResolved}
          className="w-full h-[400px] object-cover blur-[5px] brightness-50
          absolute z-[-1]
          "
          alt={manga.data.attributes.title.en}
          width={1920}
          height={400}
        />
      </div>
      <div className="mx-10 mt-4 md:mx-10 flex flex-col lg:flex-row justify-center overflow-hidden pt-4 text-white">
        <div className="w-full md:w-auto">
          <Image
            src={imageResolved}
            alt={manga.data.attributes.title.en}
            className="h-auto w-80 md:w-64 rounded-sm mt-4"
            width={512}
            height={400}
          />
          <div className="w-full md:w-1/2 justify-between">
            <div className="mt-4 sm:ml-5 lg:ml-0 flex w-full lg:w-[256px] flex-col bg-slate-800">
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
        <div className="w-full md:w-auto">
          <div className="ml-0 md:ml-5 w-full md:w-[800px] rounded-sm bg-slate-800 h-auto overflow-hidden">
            <p className="m-4 pt-3 text-2xl font-extrabold">{title}</p>
            <p className="mx-4 text-base text-slate-500">
              {manga.data.attributes.altTitles
                .slice(0, 3)
                .map((altTitle: Record<"ja-ro" | "en" | "pt-br", string>, index: number) => (
                  <span key={index}>
                    {altTitle["ja-ro"] || altTitle.en || altTitle["pt-br"]}
                    {index < 2 ? " " : ""}
                  </span> || { title }
                ))}
            </p>
            <div className="flex flex-wrap mx-2 mt-1">
              {manga.data.attributes.tags.map((item: { id: string; attributes: { name: Record<"pt-br" | "en"| "ja-ro" ,string> } }) => (
                <div key={item.id} className="m-2 bg-slate-700 rounded-sm p-2">
                  <p className="text-sm">{item.attributes.name["pt-br"] || item.attributes.name.en || item.attributes.name["ja-ro"]}</p>
                </div>
              ))}
            </div>
            <p className="m-4 text-base font-bold">Sinopse de {title}</p>
            <p className="m-4 text-base overflow-y-auto">
              {description?.split("--")[0]?.split("**")[0]}
            </p>
          </div>
          <div className="ml-0 md:ml-5 w-full md:w-[800px] rounded-sm">
            <div  className="mt-5 bg-slate-800 max-h-[400px] overflow-y-auto overflow-x-hidden" style={{ overflow: 'scroll', scrollbarWidth: 'thin', overflowX: 'hidden' }}>
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
              {chapters.data.map((chapter: { id: string; attributes: { chapter: string; title: string } }) => (
                <div key={chapter.id} className="flex items-center border-[1px]  mx-4 my-2 rounded-md">
                  <Link href={`${params.id}/${chapter.id}`}>
                    <p className="mx-2 mt-2 text-base font-light hover:text-[#776be0]">
                      Capítulo {chapter.attributes.chapter}
                    </p>
                    <p className="mx-2 mb-2 font-semibold text-xs">
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
