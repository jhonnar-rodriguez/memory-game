export type FetchedCard = {
  fields: {
    image: {
      url: string;
      tags: string[];
      uuid: string;
      title: string;
      alt_text: string;
      description: string;
      content_type: string;
    };
  };
};
