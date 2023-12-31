const BASE_URL = "https://api.mangadex.org"
const UPLOADS_URL = "https://uploads.mangadex.org"
import axios from 'axios'

type attributes = {
    fileName: string
}
type CoverData = {
    attributes: attributes
    data: {
        id: string
        type: string
        attributes: attributes;
        relationships: [
            {
                id: string
                type: string
            }
        ]
    }
}

type MangaData = {
    id: string
    type: string
    attributes: {
        title: {
            en: string
            "ja-ro": string
        }
    }
    relationships: [
        {
            id: string
            type: string
        }
    ]
}

type MangaResponse = {
    data: MangaData[]
}


type CoverResponse = {
    data: CoverData  
}


async function fetchCoverFiles(idImage: string, idManga: string) {
    const response = await axios.get<CoverResponse>(`${BASE_URL}/cover/${idImage}`)
    if (response.data){
        const fileName: string = response.data.data.attributes.fileName 
        return `${UPLOADS_URL}/covers/${idManga}/${fileName}.512.jpg`
    } else {
        throw new Error("Não foi possível obter a imagem")
    }

}


export default async function listMangas(
    params: { 
        params?: { 
            order?: { 
                rating?: string | undefined; 
                followedCount?: string | undefined 
            } | undefined; 
            limit?: number | undefined 
        } | undefined 
    } | undefined
    ) {
    const response = await axios.get<MangaResponse>(`${BASE_URL}/manga`, {
        params: {
            ...params?.params
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
        const coverArtRelationship = item.relationships.find((item: {type: string}) => item.type === "cover_art");
        const imageUnresolved: string = coverArtRelationship ? coverArtRelationship.id || ("sem imagem") : ("sem imagem");
        const imageResolved = await fetchCoverFiles(imageUnresolved, item.id);
        mangaUnresolvedImage.push({ name , image: imageResolved, id: item.id });
    }

    return mangaUnresolvedImage
}

