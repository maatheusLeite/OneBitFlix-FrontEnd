import HeaderNoAuth from "@/src/components/homeNoAuth/HeaderNoAuth/HeaderNoAuth";
import styles from "../styles/HomeNoAuth.module.scss"
import CardsSection from "@/src/components/homeNoAuth/CardsSection/CardsSection";
import PresentationSection from "@/src/components/homeNoAuth/PresentationSection/PresentationSection";

export default function HomeNotAuth() {
    return (
        <>
            <main>
                <div className={styles.sectionBackground}>
                    <HeaderNoAuth />
                    <PresentationSection />
                </div>
                <CardsSection />
            </main>
        </>
    )
}
