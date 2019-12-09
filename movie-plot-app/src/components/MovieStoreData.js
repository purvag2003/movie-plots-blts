import fetch from 'isomorphic-unfetch';

class MovieStoreData {

    //TODO Make it configurable by env
    static get endpoint() {
        return "http://127.0.0.1:5000/movies"
    }

    static async getData(filter) {

        let endpoint = MovieStoreData.endpoint + "?"

        if(filter['title']) {
            endpoint += "title=" + filter['title']
        }

        let res = await fetch(endpoint)
        console.log("result ", res)
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