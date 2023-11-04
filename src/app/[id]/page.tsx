import Header from "../components/Header";
import Footer from "../components/footer";

const BASE_URL = "https://api.mangadex.org"


async function data( {params} ) {
  const response = await fetch(`${BASE_URL}/manga/${params.id}`);
  return response.json();
}


export default async function MangaPage({ params }) {

  const manga = await data({ params });
  console.log(manga); 
  return (
    <>
    <Header/>
    <div className="text-white">
       <h1>{manga.data.attributes.title.en}</h1>
        <p>{manga.data.attributes.description.en}</p>
        <h1>ano:{manga.data.attributes.year}</h1>
    </div>
    <Footer/>
    </>
  );
}  