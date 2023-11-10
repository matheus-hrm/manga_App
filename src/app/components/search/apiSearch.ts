const BASE_URL = 'https://api.mangadex.org'
type MangaData = {
    data: [{
        id: string
        type: string
        attributes: {
            title: {
                "pt-br": string
                en: string
                "ja-ro": string
            }
        }

    }]
}
export default async function searchManga(query: string) {
    const response = await fetch(`${BASE_URL}/manga?title=${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accesss-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        },

    }
    );
    const data = await response.json() as MangaData;
    if (data) {
        const mangaData = data.data.map((manga) => ({
            id: manga.id,
            titleen: manga.attributes.title.en,
            titleptbr: manga.attributes.title["pt-br"],
        }));
        console.log(mangaData)
        return mangaData;
    }

}