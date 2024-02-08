import styles from '../../../../styles/SlideCategory.module.scss'
import CategoriesService from '@/src/services/categoriesService'
import React from 'react'
import useSWR from 'swr'
import SlideComponent from '../../common/SlideComponent/SlideComponent'

interface props {
    categoryId: number,
    categoryName: string
}

export default function CategoriesListSlide({ categoryId, categoryName }: props) {
    const { data, error } = useSWR(`/categoryCourses/${categoryId}`, () => CategoriesService.getCourses(categoryId))

    if (error) return error
    if (!data) return (<><p> Loading... </p></>)

    return (
        <>

            <p className={styles.titleCategory}> {categoryName} </p>
            <SlideComponent course={data.data.courses} />
        </>
    )
}
