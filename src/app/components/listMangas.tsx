

const BASE_URL = 'https://api.mangadex.org'

interface MangaList {
  id: string;
  attributes: {
    title: {
      en: string;
    };
    description: {
      pt?: string;
      en?: string;
    };
  };
  relationships: [
    {
      id: string;
      type: string;
      attributes?: {
        fileName: string;
      };
    },
  ]
}

interface CoverProps {
  mangaId: string;
  coverFileName: string;
}

const queryParams = {
  limit: 10,
  offset: 0,
  order: {
    createdAt: 'desc',  
  },
}

export default async function listMangas({ 
}): Promise<{ mangaIds: string[], coverFileNames: string[] }> {
  const response = await fetch(`${BASE_URL}/manga?limit=${queryParams.limit}&offset=${queryParams.offset}&order[createdAt]=desc`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const json  = await response.json()
  const data = json.data

  const mangaIds: string[] = []
  const coverFileNames: string[] = []


  data.forEach((manga: Manga) => {
    mangaIds.push(manga.id)

    const coverArt = manga.relationships.find((relationship) => relationship.type === 'cover_art')
    if (coverArt) {
      coverFileNames.push(coverArt.attributes.fileName)
    }
  })

  return { mangaIds, coverFileNames }
}
