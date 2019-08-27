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
  .then(characterNames => {
    console.log(
      `${characterDetails.name} has met 
      ${characterNames.length} characters, including: `,
      characterNames
    );
  });

async function getCharacterDataFromCharacterIds(characterIds) {
  return rp({
    uri: `https://rickandmortyapi.com/api/character/${characterIds}`,
    json: true
  });
}

async function getEpisodeUrlsFromCharacterData({ episode }) {
  return episode;
}

async function getIdsFromUrls(urls) {
  return urls.map(url => url.split('/').pop());
}

async function getEpisodeDataFromEpisodeIds(episodeIds) {
  return rp({
    uri: `https://rickandmortyapi.com/api/episode/${episodeIds}`,
    json: true
  });
}

async function getCharacterUrlsFromEpisodeData(episodeData) {
  return episodeData.reduce((characters, episode) => {
    return [...characters, ...episode.characters];
  }, []);
}

async function dedupe(characterUrls) {
  return Array.from(new Set(characterUrls));
}

function removeCharacterUrlFor(characterId) {
  return function(characterUrls) {
    return characterUrls.filter(
      character =>
        character !== `https://rickandmortyapi.com/api/character/${characterId}`
    );
  };
}

async function getCharacterNamesFromCharacterData(characterInformation) {
  return characterInformation.map(character => {
    return character.name;
  });
}
