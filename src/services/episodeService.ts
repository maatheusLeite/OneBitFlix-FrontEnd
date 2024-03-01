import api from "./api";

interface watchTimeParams {
    episodeId: number,
    seconds: number
}

const WatchEpisodeService = {
    getWatchTime: async (episodeId: number) => {
        const token = sessionStorage.getItem('onebitflix-token')

        const res = await api.get(`/episodes/${episodeId}/watchTime`, {
            headers: { Authorization: `Bearer ${token}` }
        }).catch((error) => {
            return error.response
        })

        return res
    },

    setWatchTime: async ({ episodeId, seconds }: watchTimeParams) => {
        const token = sessionStorage.getItem('onebitflix-token')

        const res = await api.post(`/episodes/${episodeId}/watchTime`, { seconds }, { // seconds serve para utilizar o parametro do body da requisição de mesmo nome
            headers: { Authorization: `Bearer ${token}` }
        }).catch((error) => {
            return error.response
        })

        return res
    }
}

export default WatchEpisodeService 