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
}

function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

export default function GetChapterArray(params : params) {
  const { data } = useSWR<response>(
    `https://api.mangadex.org/at-home/server/${params.params.chapterid}`,
    fetcher,
  ) as {data: ChapterData | undefined ; error: string; isLoading: boolean};


  if(data){
    const pagesUrl: Chapter = data.chapter.data.map((fileName: string, index: number) => ({
      url:`${data.baseUrl}/data/${data.chapter.hash}/${fileName}`,
      pageIndex: index,
    }));
    
    return pagesUrl;
  }
}
