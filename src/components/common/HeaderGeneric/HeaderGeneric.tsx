import { Container } from 'reactstrap'
import styles from './styles.module.scss'
import Link from 'next/link'

interface props {
    logoUrl: string,
    btnUrl: string,
    btnContent: string
}

export default function HeaderGeneric({ logoUrl, btnUrl, btnContent }: props) {
    return (
        <>
            <div className={styles.header}>
                <Container className={styles.headerContainer}>
                    <Link href={logoUrl}>
                        <img src="/logoOnebitflix.svg" alt="logoRegister" className={styles.headerLogo} />
                    </Link>
                    <Link href={btnUrl}>
                        <button className={styles.headerBtn}> {btnContent} </button>
                    </Link>
                </Container>
            </div>
        </>
    )
}
