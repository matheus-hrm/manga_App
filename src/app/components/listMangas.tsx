

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

export default async function listMangas(): Promise<{ mangaIds: string[], coverFileNames: string[] }> {
  const response = await fetch(`${BASE_URL}/manga?limit=${queryParams.limit}&offset=${queryParams.offset}&order[createdAt]=desc`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const json  = await response.json()
  const data: MangaList[] = json.data

  const mangaIds: string[] = []
  let coverFileNames: string[] = []
  let coverFileIds: string[] = []


  data.forEach((manga: MangaList) => {
    mangaIds.push(manga.id)

    const coverArtid = manga.relationships.filter(relationship => relationship.type === 'cover_art')[0].id
    coverFileIds.push(coverArtid)
  })

  async function fetchCoverFiles(coverFileIds: string[]) {
    const responses = await Promise.all(
      coverFileIds.map(id =>
        fetch(`https://api.mangadex.org/cover/${id}`)
      )
    );
  
    const data = await Promise.all(responses.map(response => response.json()));
  
    return data;
  }

  const coverFiles = await fetchCoverFiles(coverFileIds)
  coverFiles.forEach((coverFile: any) => {
    coverFileNames.push(coverFile.data.attributes.fileName)
  })

  return { mangaIds, coverFileNames }
}
  
