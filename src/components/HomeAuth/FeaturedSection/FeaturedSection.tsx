import styles from './styles.module.scss'
import useSWR from 'swr'
import CourseService, { CourseType } from '@/src/services/courseService'
import HeaderAuth from '../HeaderAuth/HeaderAuth'
import { Button, Container } from 'reactstrap'
import Link from 'next/link'
import { statSync } from 'fs'
import PageSpinner from '../../common/PageSpinner/PageSpinner'

export default function FeaturedSection() {
    const { data, error } = useSWR('/featured', CourseService.getFeaturedCourses)

    if (error) return error
    if (!data) return <PageSpinner />

    return (
        <>
            {
                data.data?.map((course: CourseType) => (
                    <div
                        style={{
                            backgroundImage: `linear-gradient(to bottom, #6777771a, #151515), 
                                url(${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "480px"
                        }}
                        key={course.id}
                    >
                        <HeaderAuth />
                        <Container className='pt-4'>
                            <p className={styles.title}> {course.name} </p>
                            <p className={styles.description}> {course.synopsis} </p>
                            <Link href={`/courses/${course.id}`} className='text-decoration-none' >
                                <Button outline color='light' className={styles.button}>
                                    ACESSE AGORA!
                                    <img
                                        src="/buttonPlay.svg"
                                        alt="buttonImg"
                                        className={styles.buttonImg}
                                    />
                                </Button>
                            </Link>
                        </Container>
                    </div>
                ))[0]
            }
        </>
    )
}
