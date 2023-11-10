import Header from "~/app/components/Header";
import GetChapterArray from "./api/fetchChapters";
import MangaPage from "~/app/[id]/[chapterid]/MangaPage";

type params = {
  params: {
    chapterid: string;
    id: string;
  }
};

type Chapter = {
  url: string;
  pageIndex: number;
  lenght: number;
}[];

async function GetChapters({ params }: params) {
  const response = await GetChapterArray({params}) as Chapter;
  return response;
}

export default async function Chapters({ params }: params) {

  const pagesUrl = await GetChapters({ params });

  if (!pagesUrl) return <div>Carregando...</div>;

  const images = pagesUrl.map((page) => { 
    return page.url
  });  
  
  return (
    <>
    <Header />
    {images &&
     <MangaPage images={images} />
    }
    </>
  );
}
