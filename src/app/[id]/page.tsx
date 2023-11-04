
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/footer";


const BASE_URL = "https://api.mangadex.org";
const UPLOADS_URL = "https://uploads.mangadex.org"; // Substitua pelo URL correto se necessário

async function fetchCoverFiles(idImage: string, idManga: string) {
  const response = await axios.get(`${BASE_URL}/cover/${idImage}`);
  const fileName = response.data.data.attributes.fileName;
  return `${UPLOADS_URL}/covers/${idManga}/${fileName}.256.jpg`;
}

export default async function MangaPage({ params }) {
  const res = await fetch(`${BASE_URL}/manga/${params.id}`);
  const manga = await res.json();

  const imageUnresolved = manga.data.relationships.find((item) => item.type === "cover_art").id || "sem imagem";
  const imageResolved = await fetchCoverFiles(imageUnresolved, params.id); // Use params.id

  const description = manga.data.attributes.description["pt-br"] || manga.data.attributes.description["en"] || "sem descrição";
  const title = manga.data.attributes.title["pt-br"] || manga.data.attributes.title["en"] || manga.data.attributes.title["ja-ro"] || "sem título";


  return (
    <>
      <Header />
      <div className="overflow-hidden mx-10 text-white flex justify-center mt-4">
        <div className="">
          <img src={imageResolved} alt={manga.data.attributes.title.en} className="w-64 h-auto rounded-sm" />
          <div className="justify-between w-1/2">
            <div className="flex flex-col bg-slate-800 mt-6 w-[256px]">
              <div className="m-2">
                <div className="flex justify-between mb-2"><p className="text-sm">Status</p> <p className="text-sm">{manga.data.attributes.status}</p></div>
                <div className="flex justify-between mb-2"><p className="text-sm">Demografia</p> <p className="text-sm">{manga.data.attributes.publicationDemographic}</p></div>
                <div className="flex justify-between mb-2"><p className="text-sm">Ano</p> <p className="text-sm">{manga.data.attributes.year}</p></div>
                <div className="flex justify-between"><p className="text-sm">Autor</p> <p className="text-sm">
                  {manga.data.relationships.map((item) => item.type === "author").id}
                </p></div>
                {/* <p className="text-sm">Gêneros: {manga.data.attributes.tags.map((item) => item.attributes.name["en"]).join(", ")}</p> */}

              </div>
            </div>
          </div>
        </div>


        <div className=" bg-slate-800 w-[800px] h-[500px] rounded-sm ml-5">
          <p className="text-xl m-4 font-extrabold">{title}</p>
          <p className="text-base ml-4 mb-4 text-slate-500">
            {manga.data.attributes.altTitles.slice(0, 3).map((altTitle, index) => (
              <span key={index}>
                {altTitle["ja-ro"] || altTitle["en"] || altTitle["pt-br"]} 
                  { index< 2? ' ' : ''} 
              </span>
            ))}

          </p>

          <p className="text-base font-bold m-4">Sinopse de {title}</p>
          <p className="text-base m-4">{description.split("--")[0].split("**")[0]}</p>
        </div>
      </div>

      <Footer />
    </>

  );
}
