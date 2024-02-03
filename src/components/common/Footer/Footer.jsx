import React from 'react'
import { Container } from 'reactstrap'
import styles from './styles.module.scss'


export default function Footer() {
    return (
        <>
            <Container className={styles.footer}>
                <img
                    src='/logo.png'
                    alt='logoFooter'
                    className={styles.footerLogo}

                />
                <a
                    href='http://matheuslt.com.br'
                    target='blank'
                    className={styles.footerLink}
                > 
                    MATHEUSLT.COM.BR 
                </a>
            </Container>
        </>
    )
}
