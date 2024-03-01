import { CourseType, EpisodeType } from '@/src/services/courseService'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

interface props {
    episode: EpisodeType,
    course: CourseType
}

export default function EpisodeList({ episode, course }: props) {
    const router = useRouter()

    const handleSecondsToMinutes = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60)

        const seconds = totalSeconds % 60

        function toString(num: number) {
            return num.toString().padStart(2, '0') // para adicionar o zero, por exemplo: antes: 5:00. depois: 05:00
        }

        const result = `${toString(minutes)}:${toString(seconds)}`

        return result
    }

    const handleEpisodePlayer = () => {
        router.push(`/courses/episode/${episode.order - 1}?courseid=${course.id}`)
    }

    return (
        <>
            <div className={styles.episodeCard} onClick={handleEpisodePlayer}>
                <div className={styles.episodeOrderTime}>
                    <p className={styles.episodeOrder}> Episódio N° {episode.order} </p>
                    <p className={styles.episodeTime}> {handleSecondsToMinutes(episode.secondsLong)} </p>
                </div>

                <div className={styles.episodeTitleDescription}>
                    <p className={styles.episodeTitle}> {episode.name} </p>
                    <p className={styles.episodeDescription}> {episode.synopsis} </p>
                </div>
            </div>
        </>
    )
}
