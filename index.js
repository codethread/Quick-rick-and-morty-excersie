var rp = require('request-promise');

/* TODO
 * using the rickandmortyapi, find out every episode Rick has
 * appeared in, and then, making the assumption that he met
 * every character in each episode, get a list of all the
 * characters Rick met.
 * return the results as an array of names, without duplicates
 */

(async () => {
    try {
        /*--------------------------------------------------*/
        /* code in here                                     */

        const result = await rp('https://rickandmortyapi.com/api')

        console.log(JSON.parse(result))

        /*--------------------------------------------------*/
    } catch (e) {
        console.error(e);
    }
})();
