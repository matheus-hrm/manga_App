import GET from "./api/route";
import MangaPage from "~/app/components/manga/MangaPage";

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
  const response = await GET({params})
  const data = await response?.json() as Chapter | undefined;
  return data;
}

export default async function Chapters({ params }: params) {

  const pagesUrl = await GetChapters({ params });

  if (!pagesUrl) return <div>Carregando...</div>;

  const images = pagesUrl.map((page) => { 
    return page.url
  });  
  
  return (
    <>
    {images &&
     <MangaPage images={images} />
    }
    </>
  );
}
