import fetch from 'isomorphic-unfetch';

class MovieStoreData {

    //TODO Make it configurable by env
    static get endpoint() {
        return "http://127.0.0.1:5000/movies"
    }

    static async getData() {
        let res = await fetch(MovieStoreData.endpoint)
        console.log(res)
        return res.json()
    }
}

export default MovieStoreData