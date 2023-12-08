import axios from "axios";
import React from "react";
import { type MangaData } from "~/types";

const BASE_URL = "https://api.mangadex.org";

type UnresolvedMangaData = {
    data : {
        data : [
            {
                id: string
                type: string
                attributes: {
                    title: {
                        en: string
                        "pt-br": string
                    }
                }
            }
        ]
    }
}

type FetchedManga = {
    data : {
            id : string
            attributes : {
                title : {
                    en : string
                    "pt-br" : string
                }
                description : {
                    "pt-br" : string
                }
            }
        }
}

async function getCarouselMangas() {
    const response = await axios.get<MangaData>(`${BASE_URL}/manga?title=Jujutsu Kaisen`)
    const data = response.data 

    if (data) {
        const mangaData : FetchedManga = data.map((
            manga : FetchedManga
            ) => ({
          id: manga.id,
          title: manga.attributes.title.en || 'sem titulo',
          description: manga.attributes.description['pt-br'],
          
        }));
        return mangaData as UnresolvedMangaData;
    }
}
export async function HomeCarousel() {  

  const names : string[] = ['jujustu kaisen','chainsaw man' ,'sousou no frieren'] 

  const mangaProps = await getCarouselMangas() as MangaData[]

  return (
    <>
      <div className="flex flex-row pl-8 py-4 w-screen h-1/4 bg-slate-800">
        <img>
        </img>
        { mangaProps?.map((manga,) => (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold p-2">{manga.title}</h1>
            <p className="text-xl">{manga.description}</p>
          </div>
        ))}
      </div>
    </>
    ) 
}
