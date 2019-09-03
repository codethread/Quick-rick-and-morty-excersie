const rp = require('request-promise');

/* TODO
 * using the rickandmortyapi, find out every episode Rick has
 * appeared in, and then, making the assumption that he met
 * every character in each episode, get a list of all the
 * characters Rick met.
 * return the results as an array of names, without duplicates
 */

const characterDetails = {
  id: 1,
  name: 'Rick'
};

// Typescript
// Look through rambda for naming conventions
// get ids from urls (function duplicated)
// change From to from and information to data

// remove strict

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

async function getCharacterDataFromCharacterIds(characterIds: Array<String> | Number)  {
  return rp({
    uri: `https://rickandmortyapi.com/api/character/${characterIds}`,
    json: true
  });
}


function getEpisodeUrlsFromCharacterData({ episode }: { episode: Object}) {
  return episode;
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

function getCharacterUrlsFromEpisodeData(episodeData) {
  return episodeData.reduce((characters, episode) => {
    return [...characters, ...episode.characters];
  }, []);
}

function dedupe(array: Array<any>) {
  return Array.from(new Set(array));
}

function removeCharacterUrlFor(characterId: Number) {
  return function(characterUrls: Array<String>) {
    return characterUrls.filter(
      character =>
        character !== `https://rickandmortyapi.com/api/character/${characterId}`
    );
  };
}

function getCharacterNamesFromCharacterData(characterData) {
  return characterData.map(data => {
    return data.name;
  });
}
