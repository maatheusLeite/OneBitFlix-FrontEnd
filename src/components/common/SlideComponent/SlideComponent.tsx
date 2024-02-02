"use client"

import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"
import { CourseType } from '../../../services/courseService'
import SlideCard from '../SlideCard/SlideCard';

interface props {
    course: CourseType[]
}

export default function SlideComponent({ course }: props) {
    return (
        <>
            <div>
                <Splide options={{
                    type: "loop",
                    perPage: 4,
                    perMove: 1,
                    pagination: false
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
