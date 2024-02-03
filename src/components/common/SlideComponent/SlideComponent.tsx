"use client"

import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"
import { CourseType } from '../../../services/courseService'
import SlideCard from '../SlideCard/SlideCard'

interface props {
    course: CourseType[]
}

export default function SlideComponent({ course }: props) {
    let slideCount = 0

    if (course.length >= 4) {
        slideCount = 4
    }
    else {
        slideCount = course.length
    }

    return (
        <>
            <div className="d-flex justify-content-center py-4">
                <Splide options={{
                    type: "loop",
                    perPage: slideCount,
                    perMove: 1,
                    width: slideCount * 300, // base completa com 4 slides é de 1200px
                    pagination: false,
                    arrows: course.length > 4 ? true : false, // botões de seta direito e esquerdo, caso o numero de cursos salvos seja maior que quatro elas são habilitadas
                    drag: course.length > 4 ? true : false, // arrastar da tela para passar items, caso o numero de cursos salvos seja maior que quatro ele é habilitado
                    breakpoints: {  // basicamente o mediaQuery do splide
                        1200: {
                            // quando a tela atingir 1200px
                            perPage: slideCount >= 2 ? 2 : 1, //  diminuir a quantidade de itens de 4 para 2
                            width: slideCount >= 2 ? 600 : 300,
                            arrows: course.length > 2 ? true : false,
                            drag: course.length > 2 ? true : false
                        },

                        600: {
                            // quando a tela atingir 600px
                            perPage: 1,
                            width: 300,
                            arrows: course.length > 1 ? true : false,
                            drag: course.length > 1 ? true : false
                        },

                        300: {
                            width: 250
                        }
                    }
                }}>
                    {course?.map((course) => (
                        <SplideSlide key={course.id} >
                            <SlideCard course={course} />
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </>
    )
}
