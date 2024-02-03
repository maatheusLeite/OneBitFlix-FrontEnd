import HeaderNoAuth from "@/src/components/homeNoAuth/HeaderNoAuth/HeaderNoAuth";
import styles from "../styles/HomeNoAuth.module.scss"
import CardsSection from "@/src/components/homeNoAuth/CardsSection/CardsSection";
import PresentationSection from "@/src/components/homeNoAuth/PresentationSection/PresentationSection";
import SlideSection from "@/src/components/homeNoAuth/SlideSection/SlideSection";
import CourseService, { CourseType } from "../src/services/courseService";
import { ReactNode, useEffect } from "react";
import { GetStaticProps } from "next";
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";
import Footer from '../src/components/common/Footer/Footer';
import AOS from "aos";
import 'aos/dist/aos.css'

interface IndexPageProps {
    children?: ReactNode,
    course: CourseType[]
}

export default function HomeNoAuth({ course }: IndexPageProps) {
    useEffect(() => {
        AOS.init()
    }, [])

    return (
        <>
            <Head>
                <title> OneBitFlix </title>
                <link rel="shortcut icon" href="./favicon.svg" type="image/x-icon" />
                <meta property="og:title" content="OneBitFlix" key="title" />
                <meta
                    name="description"
                    content="Tenha acesso aos melhores cursos de programação de uma forma simples e fácil!"
                />
            </Head>
            <main>
                <div
                    className={styles.sectionBackground}
                    data-aos="fade-zoom-in"
                    data-aos-duration="1600"
                >
                    <HeaderNoAuth />
                    <PresentationSection />
                </div>
                <div data-aos="fade-right" data-aos-duration="1200" >
                    <CardsSection />
                </div>
                <div  data-aos="fade-up" data-aos-duration="1350" >
                    <SlideSection newestCourses={course} />
                </div>
                <Footer />
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await CourseService.getNewestCourses()
    return {
        props: {
            course: res.data
        },
        revalidate: 60 * 60 * 24   // Realiza uma busca na api a cada um dia em segundos
    }
}
