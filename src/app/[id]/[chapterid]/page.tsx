
"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import fetchChapters from "./functionPage";
import useSWR from "swr";

type params = {
  params: {
    chapterid: string;
    id: string;
  };
};

type ChapterData = {
  chapter: {
    data: {
      hash: string;
      pages: string[];
    };
  };
  baseUrl: string;
};

type Chapter = { 
  url: string;
  pageIndex: number;
};

function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

function getChapterArray(params : params) {
  const { data, error, isLoading } = useSWR(
    `https://api.mangadex.org/at-home/server/${params.chapterid}`,
    fetcher,
  );

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar</div>;

  
  const pagesUrl = data.chapter.data.map((fileName, index) => ({
    url:`${data.baseUrl}/data/${data.chapter.hash}/${fileName}`,
    pageIndex: index,
  }));

  return {pagesUrl};
}

export default function Chapters({ params }: params) {
  const [currentPage, setCurrentPage] = useState(0);

  const { pagesUrl } = getChapterArray(params);

  if (!pagesUrl) return <div>Carregando...</div>;

  const totalPages: number = pagesUrl.length;
  return (
    <>
      <div className="flex items-center justify-center p-1">
        <Image
          src={pagesUrl[currentPage].url}
          alt={`Page ${currentPage + 1}`}
          key={currentPage}
          width={768}
          height={1024}
          
        />
      </div>
      <div className="mt-4 flex justify-center">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="m-2 rounded-lg bg-slate-500 p-3"
          >
            Página Anterior
          </button>
        )}
        {currentPage < totalPages - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="m-2 rounded-lg bg-slate-500 p-3"
          >
            Próxima Página
          </button>
        )}
      </div>
    </>
  );
}
