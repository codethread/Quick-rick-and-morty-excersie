import { TCharacterData, TEpisodeData } from "./types";

const rp = require('request-promise');

/* QUESTIONS
 * Can't put return type of TCharacterData on a promise
 */

const characterDetails = {
  id: '1',
  name: 'Rick'
};

getCharacterDataFromCharacterIds(characterDetails.id)
  .then(getEpisodeUrlsFromCharacterData)
  .then(getIdsFromUrls)
  .then(getEpisodeDataFromEpisodeIds)
  .then(getCharacterUrlsFromEpisodeData)
  .then(dedupe)
  .then(removeCharacterUrlFor(characterDetails.id))
  .then(getIdsFromUrls)
  .then(getCharacterDataFromCharacterIds)
  .then(getCharacterNamesFromCharacterData)
  .then((characterNames: Array<String>) => {
    console.log(
      `${characterDetails.name} has met 
      ${characterNames.length} characters, including: `,
      characterNames
    );
  });

async function getCharacterDataFromCharacterIds(characterIdsRaw: Array<String> | String) {
  const characterIds: String = Array.isArray(characterIdsRaw) ? characterIdsRaw.join() : characterIdsRaw;
  return rp({
    uri: `https://rickandmortyapi.com/api/character/${characterIds}`,
    json: true
  });
}

function getEpisodeUrlsFromCharacterData(characterData: TCharacterData) {
  return characterData.episode;
}

function getIdsFromUrls(urls: Array<String>) {
  return urls.map(url => url.split('/').pop());
}

async function getEpisodeDataFromEpisodeIds(episodeIds: Array<String>) {
  return rp({
    uri: `https://rickandmortyapi.com/api/episode/${episodeIds}`,
    json: true
  });
}

function getCharacterUrlsFromEpisodeData(episodeData: TEpisodeData[]) {
  return episodeData.reduce((characterUrls, episode) => {
    return [...characterUrls, ...episode.characters];
  }, []);
}

function dedupe(array: Array<any>) {
  return Array.from(new Set(array));
}

function removeCharacterUrlFor(characterId: String) {
  return function(characterUrls: Array<String>) {
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
