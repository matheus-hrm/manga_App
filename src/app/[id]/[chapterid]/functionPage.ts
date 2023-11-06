export default async function fetchChapters(params) {
    const chaptersUnresolved = await fetch(`https://api.mangadex.org/at-home/server/${params.chapterid}`);
    const chapters = await chaptersUnresolved.json();

    const totalPages = chapters.chapter.data.length;

    const pagesUrl = chapters.chapter.data.map((fileName, index) => ({
        url: `${chapters.baseUrl}/data/${chapters.chapter.hash}/${fileName}`,
        pageIndex: index, // Adicione o índice da página
    }));

    return { totalPages, pagesUrl };
}