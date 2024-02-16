import api from "./api";

export type EpisodeType = {
    id: number,
    name: string,
    synopsis: string,
    order: number,
    videoUrl: string,
    secondsLong: number
}

export type CourseType = {
    id: number,
    name: string,
    thumbnailUrl: string,
    synopsis: string,
    episodes?: EpisodeType[]
}

const CourseService = {
    getNewestCourses: async () => {
        const res = await api.get("/courses/newest").catch((error) => {
            return error.response
        })

        return res
    },

    getFeaturedCourses: async () => {
        const token = sessionStorage.getItem('onebitflix-token')

        const res = await api.get('/courses/featured', {
            headers: { Authorization: `Bearer ${token}` }
        }).catch((error) => {
            return error.response
        })

        return res
    },

    addToFavorites: async (courseId: number | string) => {
        const token = sessionStorage.getItem('onebitflix-token')

        const res = await api.post('/favorites', { courseId }, {
            headers: { Authorization: `Bearer ${token}` }
        }).catch(error => {
            return error.response
        })

        return res
    },

    removeFromFavorites: async (courseId: number | string) => {
        const token = sessionStorage.getItem('onebitflix-token')

        const res = await api.delete('/favorites', {
            headers: { Authorization: `Bearer ${token}` }
        }).catch(error => {
            return error.response
        })

        return res
    },

    getFavoritedCourses: async () => {
        const token = sessionStorage.getItem('onebitflix-token')

        const res = await api.get('/favorites', {
            headers: { Authorization: `Bearer ${token}` }
        }).catch(error => {
            return error.response
        })

        return res
    },

    getSearch: async (name: string) => {
        const token = sessionStorage.getItem('onebitflix-token')

        const res = await api.get(`/courses/search?name=${name}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).catch(error => {
            return error.response
        })

        return res
    }
}

export default CourseService