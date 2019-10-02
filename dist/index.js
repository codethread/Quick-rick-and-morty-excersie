"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require('request-promise');
/* TODO
 * using the rickandmortyapi, find out every episode Rick has
 * appeared in, and then, making the assumption that he met
 * every character in each episode, get a list of all the
 * characters Rick met.
 * return the results as an array of names, without duplicates
 */
const characterDetails = {
    id: '1',
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
    .then((characterNames) => {
    console.log(`${characterDetails.name} has met 
      ${characterNames.length} characters, including: `, characterNames);
});
// Can't put return type of TCharacterData on a promise
function getCharacterDataFromCharacterIds(characterIdsRaw) {
    return __awaiter(this, void 0, void 0, function* () {
        const characterIds = Array.isArray(characterIdsRaw) ? characterIdsRaw.join() : characterIdsRaw;
        return rp({
            uri: `https://rickandmortyapi.com/api/character/${characterIds}`,
            json: true
        });
    });
}
// type / interface 
function getEpisodeUrlsFromCharacterData(characterData) {
    return characterData.episode;
}
function getIdsFromUrls(urls) {
    return urls.map(url => url.split('/').pop());
}
function getEpisodeDataFromEpisodeIds(episodeIds) {
    return __awaiter(this, void 0, void 0, function* () {
        return rp({
            uri: `https://rickandmortyapi.com/api/episode/${episodeIds}`,
            json: true
        });
    });
}
function getCharacterUrlsFromEpisodeData(episodeData) {
    return episodeData.reduce((characterUrls, episode) => {
        return [...characterUrls, ...episode.characters];
    }, []);
}
function dedupe(array) {
    return Array.from(new Set(array));
}
function removeCharacterUrlFor(characterId) {
    return function (characterUrls) {
        return characterUrls.filter(character => character !== `https://rickandmortyapi.com/api/character/${characterId}`);
    };
}
function getCharacterNamesFromCharacterData(characterData) {
    return characterData.map(data => {
        return data.name;
    });
}
