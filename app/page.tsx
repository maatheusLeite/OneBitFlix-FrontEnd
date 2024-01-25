import HeaderNoAuth from "@/src/components/HomeNoAuth/HeaderNoAuth/HeaderNoAuth";
import PresentationSection from "@/src/components/PresentationSection/PresentationSection";
import styles from "../styles/HomeNoAuth.module.scss"
import CardsSection from "@/src/components/HomeNoAuth/CardsSection/CardsSection";

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
