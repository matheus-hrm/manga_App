import Link from "next/link";
import listMangas from "../api/listMangas";
import Image from "next/image";

export async function MangaList() {
  let manga = [];
  manga = await listMangas();

  return (
    <>
      <div className="flex flex-wrap items-center px-5 py-3 sm:flex-wrap xl:flex-nowrap ">
        {manga?.map((manga) => (
          <div
            key={manga.name}
            className="group relative m-2 flex max-w-xs flex-col items-center sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          >
            <Link href={`/${manga.id}`} className=" block">
              <div className="relative min-h-fit overflow-hidden sm:w-fit">
                <Image
                  src={manga.image}
                  alt={manga.name}
                  width={100}
                  height={150}
                  className=" max-h-36 transform overflow-hidden object-contain transition-transform group-hover:scale-110 sm:w-32 md:w-40 lg:w-48 xl:w-56 2xl:w-64"
                />
                <p className="sm:max-w-32 md:max-w-40 lg:max-w-48 xl:max-w-56 2xl:max-w-64 absolute left-0 top-0 hidden  h-full w-full overflow-auto bg-opacity-10 bg-gradient-to-b from-neutral-800 to-transparent p-2 text-center text-sm transition-all  duration-150 ease-in-out hover:scale-110 group-hover:block group-hover:opacity-100">
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
