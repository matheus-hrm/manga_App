const BASE_URL = "https://api.mangadex.org"
const UPLOADS_URL = "https://uploads.mangadex.org"
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
    const response = await axios.get(`${BASE_URL}/cover/${idImage}`)
    
    const fileName = response.data.data.attributes.fileName 

    return `${UPLOADS_URL}/covers/${idManga}/${fileName}.512.jpg`
}


export default async function listMangas() {

    const response = await axios.get(`${BASE_URL}/manga`, {
        params: {
            order: {
                followedCount: 'desc'
            },
            limit: 8
        }
    })
 

    const mangaUnresolvedImage = []
    for (const item of response.data.data) {
        let name = ''
        if (!item.attributes.title.en) {
            name = item.attributes.title["ja-ro"]
        } else {
            name = item.attributes.title.en
        }
        const imageUnresolved = item.relationships.find((item: {type: string}) => item.type === "cover_art").id || "sem imagem";
        const imageResolved = await fetchCoverFiles(imageUnresolved, item.id);
        mangaUnresolvedImage.push({ name , image: imageResolved, id: item.id });
    }


    return mangaUnresolvedImage

}

