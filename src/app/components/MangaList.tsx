import Link from "next/link";
import listMangas from "../api/listMangas";
import Image from "next/image";

type MangaListProps = {
  params?: {
    order?: {
      rating?: string;
      followedCount?: string;
    };
    limit?: number;
  };
} | undefined

export async function MangaList(params: MangaListProps) {
  let manga = [];
 
  manga = await listMangas(params);

  return (
    <>
      <div className="flex flex-wrap items-center px-5 py-3 sm:flex-wrap xl:flex-nowrap ">
        {manga?.map((manga) => (
          <div
            key={manga.name}
            className="group relative m-2 flex max-w-xs flex-col items-center sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
          >
            <Link href={`/${manga.id}`} className=" block">
              <div className="relative min-h-fit overflow-hidden sm:w-fit">
                <Image
                  src={manga.image}
                  alt={manga.name}
                  width={150}
                  height={225}
                  className=" max-h-36 transform overflow-hidden object-contain transition-transform group-hover:scale-110 sm:w-48 md:w-60 lg:w-72 xl:w-84 2xl:w-96"
                />
                <p className="sm:max-w-48 md:max-w-60 lg:max-w-72 xl:max-w-84 2xl:max-w-96 absolute left-0 top-0 hidden  h-full w-full overflow-auto bg-opacity-10 bg-gradient-to-b  p-2 text-center text-sm transition-all  duration-150 ease-in-out hover:scale-110 group-hover:block group-hover:opacity-100 group-hover: backdrop-blur-[2px] group-hover: backdrop-brightness-25 ">
                  {manga.name}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
