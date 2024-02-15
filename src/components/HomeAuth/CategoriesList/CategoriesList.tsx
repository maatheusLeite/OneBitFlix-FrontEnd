import CategoriesService, { CategoryType } from "@/src/services/categoriesService"
import useSWR from "swr"
import CategoriesListSlide from "../CategoriesListSlide/CategoriesListSlide"
import PageSpinner from "../../common/PageSpinner/PageSpinner"

export default function CategoriesList() {
    const { data, error } = useSWR('/listCategories', CategoriesService.getCategories)

    if (error) return error
    if (!data) return <PageSpinner />

    return (
        <>
            {data.data.categories?.map((category: CategoryType) => (
                <CategoriesListSlide key={category.id} categoryId={category.id} categoryName={category.name} />
            ))}
        </> 
    )
}
