
"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";

type params = {
  params: {
    chapterid: string;
    id: string;
  }
};

type ChapterData = {
    chapter: {
      hash: string;
      data: [
        fileName: string,
      ]
      dataSaver: [
        fileName: string,
      ]
    };
    baseUrl: string;
} | undefined;

type Chapter = {
  url: string;
  pageIndex: number;
  lenght?: number;
}[];


type response = {
  data: ChapterData;
  error: string;
  isLoading: boolean;
}

function fetcher(url: string) {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization',
    }
  }).then((res) => res.json());
}

function GetChapterArray(params : params) {
  const { data, error, isLoading } = useSWR<response>(
    `https://api.mangadex.org/at-home/server/${params.params.chapterid}`,
    fetcher,
  ) as {data: ChapterData | undefined ; error: string; isLoading: boolean};

 
  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar</div>;

  if(data){
    const pagesUrl: Chapter = data.chapter.data.map((fileName: string, index: number) => ({
      url:`${data.baseUrl}/data/${data.chapter.hash}/${fileName}`,
      pageIndex: index,
    }));
    
    return pagesUrl;
  }
}

export default function Chapters({ params }: params) {

  const [currentPage, setCurrentPage] = useState(0);
  const pagesUrl = GetChapterArray({params}) as Chapter | undefined;
  let imageUrl: string | undefined;
  let totalPages: number | undefined;
  if (!pagesUrl) return <div>Carregando...</div>;

  if (pagesUrl?.[currentPage]) {
    imageUrl = pagesUrl[currentPage]?.url;
    totalPages = pagesUrl.length;
  }

  return (
    <>
     
      <div className="flex items-center justify-center p-1">
        {imageUrl && 
          <Image
          src={imageUrl}
            alt={`Page ${currentPage + 1}`}
            key={currentPage}
            width={512}
            height={1080}
            style={{
              width: "auto",
              height: "100%",
            }}
          />
      }
      </div>
      <div className="mt-4 flex justify-center">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="m-2 rounded-lg bg-slate-950 p-3"
          >
            Página Anterior
          </button>
        )}
        {totalPages && currentPage < totalPages - 1 && (
          <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="m-2 rounded-lg bg-slate-950 p-3"
          >
          Próxima Página
          </button>
          )}
      </div>
    </>
  );
}
