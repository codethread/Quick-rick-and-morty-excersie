import { TCharacterData, TEpisodeData } from "./types";
import rp from 'request-promise';

/* LOOK INTO
 * More specific return types on Promises
 * Return type for a curried function 
 */

const characterDetails = {
  id: '1',
  name: 'Rick'
};

getCharacterDataFromCharacterIds(characterDetails.id)
 .then(r => console.log(r))
  // .then(getEpisodeUrlsFromCharacterData)
  // .then(getIdsFromUrls)
  // .then(getEpisodeDataFromEpisodeIds)
  // .then(getCharacterUrlsFromEpisodeData)
  // .then(dedupe)
  // .then(removeCharacterUrlFor(characterDetails.id))
  // .then(getIdsFromUrls)
  // .then(getCharacterDataFromCharacterIds)
  // .then(getCharacterNamesFromCharacterData)
  // .then((characterNames: Array<String>) => {
  //   console.log(
  //     `${characterDetails.name} has met 
  //     ${characterNames.length} characters, including: `,
  //     characterNames
  //   );
  // });

async function getCharacterDataFromCharacterIds(characterIdsRaw: Array<String> | String) {
  const characterIds: String = Array.isArray(characterIdsRaw) ? characterIdsRaw.join() : characterIdsRaw;
  return rp<TCharacterData>({
    uri: `https://rickandmortyapi.com/api/character/${characterIds}`,
    json: true
  });
}

function getEpisodeUrlsFromCharacterData(characterData: TCharacterData): Array<String> {
  return characterData.episode;
}

function getIdsFromUrls(urls: Array<String>): Array<String> {
  return urls.map(url => url.split('/').pop());
}

async function getEpisodeDataFromEpisodeIds<T>(episodeIds: Array<String>): Promise<T> {
  return rp({
    uri: `https://rickandmortyapi.com/api/episode/${episodeIds}`,
    json: true
  });
}

function getCharacterUrlsFromEpisodeData(episodeData: TEpisodeData[]): Array<String> {
  return episodeData.reduce((characterUrls, episode) => {
    return [...characterUrls, ...episode.characters];
  }, []);
}

function dedupe<T>(array: Array<T>): Array<T>{
  return Array.from(new Set(array));
}

function removeCharacterUrlFor(characterId: String){
  return function(characterUrls: Array<String>): Array<String> {
    return characterUrls.filter(
      character =>
        character !== `https://rickandmortyapi.com/api/character/${characterId}`
    );
  };
}

function getCharacterNamesFromCharacterData(characterData: TCharacterData[]) {
  return characterData.map(data => {
    return data.name;
  });
}
