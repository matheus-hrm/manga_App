
const BASE_URL = "https://api.mangadex.org"


async function data( {params} ) {
  const response = await fetch(`${BASE_URL}/manga/${params.id}`);
  console.log(response);
  return response.json();
}

export default async function MangaPage({ params }) {
  
  const manga = await data({params});
  
  console.log(manga);

  
  return (
    <div>
       
      
    </div>
  );
}  