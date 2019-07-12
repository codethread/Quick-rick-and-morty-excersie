const rp = require('request-promise');

/* TODO
 * using the rickandmortyapi, find out every episode Rick has
 * appeared in, and then, making the assumption that he met
 * every character in each episode, get a list of all the
 * characters Rick met.
 * return the results as an array of names, without duplicates
 */

const RICKY = 1;

const getCharacterInfo = async characterId => {
  const characterInfo = await rp(
    `https://rickandmortyapi.com/api/character/${characterId}`
  ).then(characterInfoData => {
    const { id, name, episode } = JSON.parse(characterInfoData);

    const episodeNumbers = episode.reduce((eps, ep) => {
      eps.push(ep.replace('https://rickandmortyapi.com/api/episode/', ''));
      return eps;
    }, []);

    return {
      id,
      name,
      episodeNumbers
    };
  });
  return characterInfo;
};

const getCharacterIdsAssociatedWithAnotherCharacter = async (
  id,
  name,
  episodeNumbers
) => {
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

    const uniqueCharacterIds = charactersWithoutDuplicatesAndSelf.reduce(
      (ids, url) => {
        ids.push(url.replace('https://rickandmortyapi.com/api/character/', ''));
        return ids;
      },
      []
    );
    return uniqueCharacterIds;
  });
  return associatedCharacterIds;
};

const getCharacterNamesFromListOfIds = async idList => {
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
};

getCharacterInfo(RICKY)
  .then(({ id, name, episodeNumbers }) =>
    getCharacterIdsAssociatedWithAnotherCharacter(id, name, episodeNumbers)
  )
  .then(idList => getCharacterNamesFromListOfIds(idList));
