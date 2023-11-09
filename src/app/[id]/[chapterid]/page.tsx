
"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import GetChapterArray from "./fetchChapters";

type params = {
  params: {
    chapterid: string;
    id: string;
  }
};


type Chapter = {
  url: string;
  pageIndex: number;
  lenght?: number;
}[];


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
