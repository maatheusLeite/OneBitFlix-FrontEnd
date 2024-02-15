import styles from '../../../../styles/SlideCategory.module.scss'
import CourseService from '@/src/services/courseService'
import useSWR from 'swr'
import SlideComponent from '../../common/SlideComponent/SlideComponent'
import PageSpinner from '../../common/PageSpinner/PageSpinner'

export default function NewestCategory() {
    const { data, error } = useSWR('/newest', CourseService.getNewestCourses)

    if (error) return error
    if (!data) return <PageSpinner />
    return (
        <>
            <p className={styles.titleCategory}> LANÇAMENTOS </p>
            <SlideComponent course={data.data} />
        </>
    )
}
