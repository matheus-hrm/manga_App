const BASE_URL = "https://api.mangadex.org"
import axios from 'axios'

type Manga = {
    name: string
    image: string
}

type MangaUnresolvedImage = {
    name: string
    image: string
}

async function fetchCoverFiles(idImage: string, idManga: string) {
    const response = await axios.get(`https://api.mangadex.org/cover/${idImage}`)
    
    const fileName = response.data.data.attributes.fileName 

    return `https://uploads.mangadex.org/covers/${idManga}/${fileName}.256.jpg`
}


export default async function listMangas() {

    const response = await axios.get('https://api.mangadex.org/manga', {
        params: {
            order: {
                rating: "desc",
            },
            limit: 10
        }
    })
 

    const mangaUnresolvedImage = []
    for (const item of response.data.data) {
        const name = item.attributes.title.en;
        const imageUnresolved = item.relationships.find((item) => item.type === "cover_art").id || "sem imagem";
        const imageResolved = await fetchCoverFiles(imageUnresolved, item.id);
        mangaUnresolvedImage.push({ name  , image: imageResolved });
    }


    return mangaUnresolvedImage

}

