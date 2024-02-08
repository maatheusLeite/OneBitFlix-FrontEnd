import useSWR from 'swr'
import styles from '../../../../styles/SlideCategory.module.scss'
import CourseService from '@/src/services/courseService'
import SlideComponent from '../../common/SlideComponent/SlideComponent'

export default function FavoriteCategory() {
    const { data, error } = useSWR('/favorites', CourseService.getFavoritedCourses)

    if (error) return error
    if (!data) return (<><p> Loading... </p></>)

    return (
        <>
            <p className={styles.titleCategory}> MINHA LISTA </p>
            {
                data.data.courses.length >= 1 ?
                    (
                        <SlideComponent course={data.data.courses} />
                    )
                    :
                    (
                        <p className='text-center pt-3 h5'>
                            Você não possui nenhum curso salvo na sua lista
                        </p>
                    )
            }
        </>
    )
}
