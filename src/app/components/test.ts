const BASE_URL = "https://api.mangadex.org"
import axios from 'axios'

function listMangas() {


    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.mangadex.org/manga/?order[relevance]=desc&limit=100&order[createdAt]=desc',
        headers: {}
    };

        axios.get(config.url, {
            params : {  
                order: {
                    relevance: "desc",
                    createdAt: "desc"
                },
                limit: 100
            }
        })

}
listMangas()