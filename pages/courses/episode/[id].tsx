import '../../../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../../../styles/EpisodePlayer.module.scss'
import { useRouter } from 'next/router'
import Head from 'next/head'
import HeaderGeneric from '@/src/components/common/HeaderGeneric/HeaderGeneric'
import { useEffect, useState } from 'react'
import CourseService, { CourseType } from '@/src/services/courseService'
import PageSpinner from '@/src/components/common/PageSpinner/PageSpinner'
import { Button, Container } from 'reactstrap'
import ReactPlayer from 'react-player'

export default function EpisodePlayer() {
    const router = useRouter()
    const episodeOrder = parseFloat(router.query.id?.toString() || '')
    const courseId = router.query.courseid?.toString() || ''

    const [course, setCourse] = useState<CourseType>()

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
        router.push(`/courses/episode/${episodeOrder - 1}?courseid=${courseId}`)
    }

    const handleNextEpisode = () => {
        router.push(`/courses/episode/${episodeOrder + 1}?courseid=${courseId}`)
    }

    useEffect(() => {
        getCourse()
    }, [courseId]) // se o course id for modificado, o useEffect é chamado novamente

    if (course?.episodes === undefined) {
        return <PageSpinner />
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
