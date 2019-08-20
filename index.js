const rp = require('request-promise');

/* TODO
 * using the rickandmortyapi, find out every episode Rick has
 * appeared in, and then, making the assumption that he met
 * every character in each episode, get a list of all the
 * characters Rick met.
 * return the results as an array of names, without duplicates
 */

const RICK = 1;

// break down into smaller functions
// update remaining reduces
// Add in slice
// Typescript

getCharacterInfo(RICK)
  .then(getCharacterIdsAssociatedWithAnotherCharacter)
  .then(getCharacterNamesFromListOfIds);

async function getCharacterInfo(characterId) {
  const characterInfo = await rp(
    `https://rickandmortyapi.com/api/character/${characterId}`
  ).then(characterInfoData => {
    const { id, name, episode } = JSON.parse(characterInfoData);

    // SLICE rather than replace
    const episodeNumbers = episode.map(episodeURL =>
      episodeURL.replace('https://rickandmortyapi.com/api/episode/', '')
    );

    return {
      id,
      name,
      episodeNumbers
    };
  });
  return characterInfo;
}

async function getCharacterIdsAssociatedWithAnotherCharacter(characterInfo) {
  const { id, episodeNumbers } = characterInfo;
  const associatedCharacterIds = await rp({
    uri: `https://rickandmortyapi.com/api/episode/${episodeNumbers}`,
    json: true
  }).then(multipleEpisodesData => {
    const charactersWithDuplicates = multipleEpisodesData.reduce(
      (characters, episode) => {
        return [...characters, ...episode.characters];
      },
      []
    );

    const charactersWithoutDuplicates = Array.from(
      new Set(charactersWithDuplicates)
    );

    const charactersWithoutDuplicatesAndSelf = charactersWithoutDuplicates.filter(
      character =>
        character !== `https://rickandmortyapi.com/api/character/${id}`
    );

    const uniqueCharacterIds = charactersWithoutDuplicatesAndSelf.map(
      characterURL =>
        characterURL.replace('https://rickandmortyapi.com/api/character/', '')
    );
    return uniqueCharacterIds;
  });
  return associatedCharacterIds;
}

async function getCharacterNamesFromListOfIds(idList) {
  const associatedCharacterNames = await rp({
    uri: `https://rickandmortyapi.com/api/character/${idList}`,
    json: true
  }).then(multipleCharactersData => {
    return multipleCharactersData.reduce((names, character) => {
      names.push(character.name);
      return names;
    }, []);
  });
  console.log(associatedCharacterNames);
  return associatedCharacterNames;
}
