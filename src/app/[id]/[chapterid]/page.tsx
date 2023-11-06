'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import fetchChapters from './functionPage';

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Chapters({ params }) {
  const [currentPage, setCurrentPage] = useState(0);

  const Chapters = await fetchChapters(params);
  console.log(Chapters);


  setCurrentPage(0) = []

  return (
    <>
      <div className="flex items-center justify-center p-1">
        <Image
          src={Chapters.pagesUrl.url[currentPage]}
          alt={`Page ${currentPage + 1}`}
          key={currentPage}
          width={768}
          height={1024}
        />
      </div>
      <div className="flex justify-center mt-4">
        {currentPage > 0 && (
          <button onClick={handlePreviousPage}>Página Anterior</button>
        )}
        {currentPage < Chapters.totalPages - 1 && (
          <button onClick={handleNextPage}>Próxima Página</button>
        )}
      </div>
    </>
  );
}
