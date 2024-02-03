import { Container } from 'reactstrap'
import { CourseType } from '../../../services/courseService'
import styles from './styles.module.scss'
import SlideComponent from '../../common/SlideComponent/SlideComponent'
import Link from 'next/link'

interface props {
    newestCourses: CourseType[]
}

export default function SlideSection({ newestCourses }: props) {
    return (
        <>
            <Container className='d-flex flex-column align-items-center py-5'>
                <p  className={styles.sectionTitle}> AULAS JÁ DISPONÍVEIS </p>
                <SlideComponent course={newestCourses} />
                <Link className='text-decoration-none' href='/register'>
                    <button className={styles.slideSectionBtn}>
                        Se cadastre para acessar!
                    </button>
                </Link>
            </Container>
        </>
    )
}
