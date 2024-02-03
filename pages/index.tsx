import HeaderNoAuth from "@/src/components/homeNoAuth/HeaderNoAuth/HeaderNoAuth";
import styles from "../styles/HomeNoAuth.module.scss"
import CardsSection from "@/src/components/homeNoAuth/CardsSection/CardsSection";
import PresentationSection from "@/src/components/homeNoAuth/PresentationSection/PresentationSection";
import SlideSection from "@/src/components/homeNoAuth/SlideSection/SlideSection";
import CourseService, { CourseType } from "../src/services/courseService";
import { ReactNode } from "react";
import { GetStaticProps } from "next";
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";

interface IndexPageProps {
    children?: ReactNode,
    course: CourseType[]
}

export default function HomeNoAuth({ course }: IndexPageProps) {
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
                <div className={styles.sectionBackground}>
                    <HeaderNoAuth />
                    <PresentationSection />
                </div>
                <CardsSection />
                <SlideSection newestCourses={course} />
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
