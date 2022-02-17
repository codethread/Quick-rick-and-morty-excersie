const { get } = require('request');
const rp = require('request-promise');

// /* TODO
//  * using the rickandmortyapi, find out every episode Rick has
//  * appeared in, and then, making the assumption that he met
//  * every character in each episode, get a list of all the
//  * characters Rick met.
//  * return the results as an array of names, without duplicates
//  */

async function fetch(api) {
    return JSON.parse(await rp(api));
}


(async () => {
  try {
    /*--------------------------------------------------*/
    /* code in here                                     */
    const apis = await fetch('https://rickandmortyapi.com/api');
    const allCharacters = await fetch(apis.characters)

    // finds Rick and gets his eps
    const rick = allCharacters.results.find(character => character.id === 1);
    const rickEpisodes = rick.episode
   
    // gets Rick's ep ID's
    let rickEpIds = rickEpisodes.map(ep => ep.slice(-2));
    let cleanRickEpIds = rickEpIds.map(ep => ep.replace(/[^\w\s]/gi, ''))
    let rickEpIds2 = cleanRickEpIds.toString()
   

    // below is all eps with Rick in and all info
    let allEpisodes = await fetch(apis.episodes + '/ ' + rickEpIds2)
   

    // below is all chars for all these eps 
    const allEpChars = allEpisodes.map(ep => ep.characters)

    // splits and removes letters ect to get all char Ids
    const allEpCharString = allEpChars.toString().split(',')
    const charIds1 = allEpCharString.map(char => char.replace(/[^\w\s]/gi, ''))
    const charIds2 = charIds1.map(char => char.replace(/[a-z]/gi, ''))

    // removes duplicate ids
    const filteredCharIds = [...new Set(charIds2)]
  

    // gets all info about chars in ricks eps
    const filteredIdsString = filteredCharIds.toString()
    const getRicksChars = await fetch(apis.characters + '/ ' + filteredIdsString)


    // gets all of the names and removes duplicates
    const names = getRicksChars.map(chars => chars.name)
    const filteredNames = [...new Set(names)]
    // console.log(filteredNames)








    /*--------------------------------------------------*/
  } catch (e) {
    console.error(e);
  }
})();
