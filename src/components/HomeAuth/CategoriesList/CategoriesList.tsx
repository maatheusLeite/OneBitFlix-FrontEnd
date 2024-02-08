import CategoriesService, { CategoryType } from "@/src/services/categoriesService"
import useSWR from "swr"
import CategoriesListSlide from "../CategoriesListSlide/CategoriesListSlide"

export default function CategoriesList() {
    const { data, error } = useSWR('/listCategories', CategoriesService.getCategories)

    if (error) return error
    if (!data) return (<><p> Loading... </p></>)

    return (
        <>
            {data.data.categories?.map((category: CategoryType) => (
                <CategoriesListSlide key={category.id} categoryId={category.id} categoryName={category.name} />
            ))}
        </> 
    )
}
