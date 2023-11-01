
interface CoverProps {
  mangaId: string;
  coverFileName: string;
}

export default async function fetchCovers ({ mangaId, coverFileName }: CoverProps) {
  
  const response = await fetch(`https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}.512.jpg`)
  const cover = await response.blob()
  return cover

}