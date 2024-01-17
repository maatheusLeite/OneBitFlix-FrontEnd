import { Button, Container } from 'reactstrap'
import styles from './styles.module.scss'
import Link from 'next/link'

export default function HeaderNoAuth() {
    return (
        <>
            <div className={styles.ctaSection}>
                <img
                    src="/homeNoAuth/logoCta.png"
                    alt="logoCta"
                    className={styles.imgCta}
                />
                <p> Se cadastre para ter acesso aos cursos </p>
                <img
                    src="/homeNoAuth/logoCta.png"
                    alt="logoCta"
                    className={styles.imgCta}
                />
            </div>
            <Container className={styles.nav}>
                <img
                    src="/logoOnebitflix.svg"
                    alt="logoOneBitFlix"
                    className={styles.imgLogoNav}
                />
                <div>
                    <Link href='/login'>
                        <button className={'btn ' + styles.navBtn}>
                            Entrar
                        </button>
                    </Link>

                    <Link href='/registrer'>
                        <button className={'btn ' + styles.navBtn}>
                            Quero fazer parte
                        </button>
                    </Link>
                </div>
            </Container>
        </>
    )
}
