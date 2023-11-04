
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

  return (
    <>
      <Header />
      <div className="overflow-hidden">
        <div className="float-left w-[235px] mx-[15px]">
        <img src={imageResolved} alt={manga.data.attributes.title.en} className="mr-4" /> 
        </div>
        <div>
          <h1 className="text-2xl">{manga.data.attributes.title.en}</h1>
          <p className="text-xl">{description}</p>
        </div>
      </div>

      <Footer />
    </>
  );
}
