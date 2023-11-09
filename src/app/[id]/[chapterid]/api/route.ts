import { NextResponse } from "next/server";

type params = {
  params: {
    chapterid: string;
    id: string;
  };
};

type ChapterData =
  | {
      chapter: {
        hash: string;
        data: [fileName: string];
        dataSaver: [fileName: string];
      };
      baseUrl: string;
    }
  | undefined;

type Chapter = {
  url: string;
  pageIndex: number;
  lenght?: number;
}[];

export default async function GET(params: params) {
  const response = await fetch(
    `https://api.mangadex.org/at-home/server/${params.params.chapterid}`,
    {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    }
  );
  const data = await response.json() as ChapterData;

  if (data) {
    const pagesUrl: Chapter = data.chapter.data.map(
      (fileName: string, index: number) => ({
        url: `${data.baseUrl}/data/${data.chapter.hash}/${fileName}`,
        pageIndex: index,
      }),
    );

    return NextResponse.json(pagesUrl);
  }
}
