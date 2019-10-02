export type TCharacterData = {
    id: Number;
    name: String;
    status: String;
    species: String;
    type: String;
    gender: String;
    origin: {
      name: String;
      url: String;
    };
    location: {
      name: String;
      url: String;
    };
    image: String;
    episode: String[]; 
    url: String;
    created: String;
}

export type TEpisodeData = {
  id: Number,
  name: String,
  air_date: String,
  episode: String,
  characters: String[],
  url: String,
  created: String 
}
