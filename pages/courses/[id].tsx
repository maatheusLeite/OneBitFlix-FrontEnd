// o nome deste arquivo é [id] e está na pasta course pois é dessa forma que as rotas do appRouter funcionam

import HeaderAuth from '@/src/components/HomeAuth/HeaderAuth/HeaderAuth'
import '../../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../../styles/coursePage.module.scss'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CourseService, { CourseType } from '@/src/services/courseService'
import { Button, Container } from 'reactstrap'
import PageSpinner from '@/src/components/common/PageSpinner/PageSpinner'
import EpisodeList from '@/src/components/EpisodeList/EpisodeList'
import Footer from '@/src/components/common/Footer/Footer'

export default function CoursePage() {
    const router = useRouter()
    const { id } = router.query // Pelo arquivo ser dinamico, o id pode ser recuperado pela desestruturação da URL

    const [course, setCourse] = useState<CourseType>()
    const [liked, setLiked] = useState(false)
    const [favorited, setFavorited] = useState(false)

    const getCourse = async function () {
        if (typeof id !== 'string') {
            return
        }

        const res = await CourseService.getEpisodes(id)

        if (res.status === 200) {
            setCourse(res.data)
            setLiked(res.data.liked)
            setFavorited(res.data.favorited)
        }
    }

    useEffect(() => {
        getCourse()
    }, [id]) // chama o useEffect toda vez que o id mudar

    const handleLikeCourse = async () => {
        if (typeof id !== 'string') {
            return
        }

        if (liked === true) {
            await CourseService.removeLike(id)
            setLiked(false)
        }
        else {
            await CourseService.addLike(id)
            setLiked(true)
        }
    }

    const handleFavoriteCourse = async () => {
        if (typeof id !== 'string') {
            return
        }

        if (favorited === true) {
            await CourseService.removeFromFavorites(id)
            setFavorited(false)
        }
        else {
            await CourseService.addToFavorites(id)
            setFavorited(true)
        }
    }

    if (course === undefined) {
        return <PageSpinner />
    }

    return (
        <>
            <Head>
                <title> OneBitFlix - {course?.name} </title>
                <link rel="shortcut icon" href="./favicon.svg" type="image/x-icon" />
            </Head>

            <main>
                <div style={{
                    backgroundImage: `linear-gradient(to bottom, #6676671a, #151515), 
                    url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '550px'
                }}

                >
                    <HeaderAuth />
                </div>

                <Container className={styles.courseInfo}>
                    <p className={styles.courseTitle}> {course?.name} </p>
                    <p className={styles.courseDescription}> {course?.synopsis} </p>
                    <Button outline className={styles.courseBtn} disabled={course?.episodes?.length === 0 ? true : false}>
                        ASSISTIR AGORA!
                        <img src='/buttonPlay.svg' alt='buttonImg' className={styles.buttonImg} />
                    </Button>

                    <div className={styles.interactions}>
                        {
                            liked === false ? (
                                <img
                                    src='/course/iconLike.svg'
                                    alt='likeImg'
                                    className={styles.interactionImg}
                                    onClick={handleLikeCourse}
                                />
                            )
                                :
                                (
                                    <img
                                        src='/course/iconLiked.svg'
                                        alt='likedImg'
                                        className={styles.interactionImg}
                                        onClick={handleLikeCourse}
                                    />
                                )
                        }
                        {
                            favorited === false ? (
                                <img
                                    src='/course/iconAddFav.svg'
                                    alt='favoriteImg'
                                    className={styles.interactionImg}
                                    onClick={handleFavoriteCourse}
                                />
                            )
                                :
                                (
                                    <img
                                        src='/course/iconFavorited.svg'
                                        alt='favoritedImg'
                                        className={styles.interactionImg}
                                        onClick={handleFavoriteCourse}
                                    />
                                )
                        }
                    </div>
                </Container>

                <Container className={styles.episodeInfo}>
                    <p className={styles.episodesDivision}> EPISÓDIOS </p>
                    <p className={styles.episodeLength}>
                        {course?.episodes?.length} {' '}
                        {course?.episodes?.length !== undefined && course?.episodes?.length !== 1 ? 'episódios' : 'episódio'}
                    </p>

                    {
                        course?.episodes?.length === 0 ?
                            (<strong> Não temos episódios ainda, volte outra hora! </strong>)
                            :
                            course?.episodes?.map((episode) => (
                                <EpisodeList key={episode.id} episode={episode} course={course} />
                            ))
                    }
                </Container>

                <Footer />
            </main>
        </>
    )
}
