import useSWR from 'swr'
import styles from '../../../../styles/SlideCategory.module.scss'
import CourseService from '@/src/services/courseService'
import SlideComponent from '../../common/SlideComponent/SlideComponent'
import PageSpinner from '../../common/PageSpinner/PageSpinner'

export default function FeaturedCategory() {
    const { data, error } = useSWR('/featured', CourseService.getFeaturedCourses)

    if (error) return error
    if (!data) return <PageSpinner />

    return (
        <>
            <p className={styles.titleCategory}> EM DESTAQUE </p>
            <SlideComponent course={data.data} />
        </>
    )
}
