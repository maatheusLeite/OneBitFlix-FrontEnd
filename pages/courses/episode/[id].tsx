import '../../../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../../../styles/EpisodePlayer.module.scss'
import { useRouter } from 'next/router'
import Head from 'next/head'
import HeaderGeneric from '@/src/components/common/HeaderGeneric/HeaderGeneric'
import { useEffect, useRef, useState } from 'react'
import CourseService, { CourseType } from '@/src/services/courseService'
import PageSpinner from '@/src/components/common/PageSpinner/PageSpinner'
import { Button, Container } from 'reactstrap'
import ReactPlayer from 'react-player'
import WatchEpisodeService from '@/src/services/episodeService'

export default function EpisodePlayer() {
    const router = useRouter()
    const episodeOrder = parseFloat(router.query.id?.toString() || '') // parametro de query da requisição
    const episodeId = parseFloat(router.query.episodeid?.toString() || '') // parametro de query da requisição
    const courseId = router.query.courseid?.toString() || '' // parametro de query da requisição

    const [course, setCourse] = useState<CourseType>()
    const [isReady, setIsReady] = useState(false)
    const [getEpisodeTime, setGetEpisodeTime] = useState(0)
    const [episodeTime, setEpisodeTime] = useState(0)

    const [loading, setLoading] = useState(true)

    const playerRef = useRef<ReactPlayer>(null)

    const handleGetEpisodeTime = async () => {
        const res = await WatchEpisodeService.getWatchTime(episodeId)

        console.log(res)
        if (res.data !== null) {
            setGetEpisodeTime(res.data.seconds)
        }
    }

    const handleSetEpisodeTime = async () => {
        await WatchEpisodeService.setWatchTime({
            episodeId: episodeId,
            seconds: Math.round(episodeTime)
        })
    }

    useEffect(() => {
        handleGetEpisodeTime()
    }, [router])

    const handlePlayerTime = () => {
        playerRef.current?.seekTo(getEpisodeTime)
        setIsReady(true)
    }

    if (isReady === true) {
        setTimeout(() => {
            handleSetEpisodeTime()
        }, 1000 * 3);
    }

    const getCourse = async function () {
        if (typeof courseId !== 'string') {
            return
        }

        const res = await CourseService.getEpisodes(courseId)

        if (res.status === 200) {
            setCourse(res.data)
        }
    }

    const handleLastEpisode = () => {
        router.push(`/courses/episode/${episodeOrder - 1}?courseid=${courseId}&episodeid=${episodeId - 1}`)
    }

    const handleNextEpisode = () => {
        router.push(`/courses/episode/${episodeOrder + 1}?courseid=${courseId}&episodeid=${episodeId + 1}`)
    }

    useEffect(() => {
        getCourse()
    }, [courseId]) // se o course id for modificado, o useEffect é chamado novamente

    useEffect(() => {
        if (!sessionStorage.getItem('onebitflix-token')) {
            router.push('/login')
        }
        else {
            setLoading(false)
        }
    }, [])

    if (course?.episodes === undefined) {
        return <PageSpinner />
    }

    if (loading) {
        return <PageSpinner />
    }

    if ((episodeOrder + 1) < course?.episodes?.length) {
        if (Math.round(episodeTime) === course.episodes[episodeOrder].secondsLong) {
            handleNextEpisode()
        }
    }

    return (
        <>
            <Head>
                <title> OneBitFlix - {course.episodes[episodeOrder].name} </title>
                <link rel="shortcut icon" href="./favicon.svg" type="image/x-icon" />
            </Head>

            <main>
                <HeaderGeneric
                    logoUrl='/home'
                    btnContent={'Voltar para o curso'}
                    btnUrl={`/courses/${courseId}`}
                />

                <Container className='d-flex flex-column align-items-center gap-3 pt-5'>
                    <p className={styles.episodeTitle}>
                        {course.episodes[episodeOrder].name}
                    </p>

                    {
                        // se tudo na tela já estiver sido carregado
                        typeof window === 'undefined' ? null : (
                            <ReactPlayer
                                className={styles.player}
                                url={`${process.env.NEXT_PUBLIC_BASEURL}/episodes/stream?videoUrl=${course.episodes[episodeOrder].videoUrl}&token=${sessionStorage.getItem('onebitflix-token')}`}
                                controls
                                ref={playerRef}
                                onStart={handlePlayerTime}
                                onProgress={(progress) => {
                                    setEpisodeTime(progress.playedSeconds)
                                }}
                            />
                        )
                    }

                    <div className={styles.episodeButtomDiv}>
                        <Button
                            className={styles.episodeButtom}
                            disabled={episodeOrder === 0 ? true : false}
                            onClick={handleLastEpisode}
                        >
                            <img
                                src="/episode/iconArrowLeft.svg"
                                alt="SetaEsquerda"
                                className={styles.arrowImg}
                            />
                        </Button>

                        <Button
                            className={styles.episodeButtom}
                            disabled={episodeOrder + 1 === course.episodes.length ? true : false}
                            onClick={handleNextEpisode}
                        >
                            <img
                                src="/episode/iconArrowRight.svg"
                                alt="SetaDireita"
                                className={styles.arrowImg}
                            />
                        </Button>
                    </div>

                    <p className='text-center py-4'>
                        {course.episodes[episodeOrder].synopsis}
                    </p>
                </Container>
            </main>
        </>
    )
}
