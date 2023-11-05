import Image from "next/image";

export default async function Chapters({params}) {
  
  const chaptersUnresolved = await fetch(`https://api.mangadex.org/at-home/server/${params.chapterid}`);
  const chapters = await chaptersUnresolved.json();
  
  return (
    <>
      {chapters.chapter.data.map((filename) => {
        const imageUrl = `${chapters.baseUrl}/data/${chapters.chapter.hash}/${filename}`;
        return (
          <div className="flex items-center justify-center p-4">
            <Image src={imageUrl} alt={filename} key={filename} width={768} height={1024} />;
          </div>
        )
      })}
      <a href={`/chapter/${parseInt(params.chapterid) + 1}`}>Próximo Capítulo</a>
    </>
  )
}
