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

    static async saveData(id, data) {
        const endpoint = MovieStoreData.endpoint + "/" + id
        let res =  fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function(response) {
            if (response.status != 200) {
                return false
            }
            return response.text();
        })
        return  res;
    }
}

export default MovieStoreData