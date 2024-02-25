import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/search.module.scss'
import Head from 'next/head'
import HeaderAuth from '@/src/components/HomeAuth/HeaderAuth/HeaderAuth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CourseService, { CourseType } from '@/src/services/courseService'
import { Container } from 'reactstrap'
import SearchCard from '@/src/components/HomeAuth/SearchCard/SearchCard'
import Footer from '@/src/components/common/Footer/Footer'

export default function search() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const searchName: any = router.query.name

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchResult, setSearchResult] = useState<CourseType[]>([])

    async function searchCourses() {
        const res = await CourseService.getSearch(searchName)

        setSearchResult(res.data.courses)
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        searchCourses()
    }, [searchName]) // se o searchName mudar, o useEffect será chamado novamente

    return (
        <>
            <Head>
                <title> OneBitFlix - {searchName} </title>
                <link rel="shortcut icon" href="./favicon.svg" type="image/x-icon" />
            </Head>
            <main className={styles.main}>
                <div className={styles.headerFooterBg}>
                    <HeaderAuth />
                </div>
                {
                    searchResult.length >= 1 ? (
                        <div className={styles.searchContainer}>
                            <Container className='d-flex flex-wrap justify-content-center gap-5 py-4'>
                                {
                                    searchResult?.map((course) => (
                                        <SearchCard key={course.id} course={course} />
                                    ))
                                }
                            </Container>
                        </div>
                    )
                    :
                    (
                        <div className={styles.searchContainer}>
                            <p className={`${styles.noSearchText} pt-5`}> Nenhum resultaedo encontrado :/ </p>
                        </div>
                    )
                }

                <div className={styles.headerFooterBg}>
                    <Footer />
                </div>
            </main>
        </>
    )
}
