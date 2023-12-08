export type params = {
  params: {
    id: string;
  };
};

export type attributes = {
  fileName: string;
};

export type CoverData = {
  attributes: attributes;
  data: {
    id: string;
    type: string;
    attributes: attributes;
    relationships: [
      {
        id: string;
        type: string;
      },
    ];
  };
};

export type MangaData = {
  [x: string]: ReactNode;
  data: any;
  id: string;
  type: string;
  attributes: {
    title: {
      "pt-br": string;
      en: string;
      "ja-ro": string;
    };
    altTitles: [
      {
        en: string;
        "ja-ro": string;
        "pt-br": string;
      },
    ];
    description: {
      en: string;
      "pt-br": string;
    };
    publicationDemographic: string;
    status: string;
    year: number;
    contentRating: string;
    tags: [
      {
        id: string;
        type: string;
        attributes: {
          name: {
            en: string;
            "ja-ro": string;
            "pt-br": string;
          };
        };
        relationships: [];
      },
    ];
  };
  relationships: [
    {
      id: string;
      type: string;
    },
  ];
};

export type ChapterData = {
  id: string;
  type: string;
  attributes: {
    chapter: string;
    title: string;
    volume: string;
    translatedLanguage: string;
    hash: string;
    data: string[];
    publishAt: string;
    createdAt: string;
    updatedAt: string;
  };
  relationships: [
    {
      id: string;
      type: string;
    },
  ];
};

export type MangaResponse = {
  data: MangaData;
};

export type CoverResponse = {
  data: CoverData;
};

export type InputQuery = {
  input: string;
};

export type MangaDataid = {
  id: string;
  title: string;
}[];

export type UnresolvedMangaData = {
  data: [
    {
      id: string;
      type: string;
      attributes: {
        title: {
          "pt-br": string;
          en: string;
          "ja-ro": string;
        };
      };
    },
  ];
};