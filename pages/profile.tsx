import '../styles/globals.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Head from "next/head"
import styles from '../styles/profile.module.scss'
import UserForm from "@/src/components/Profile/UserForm/UserForm"
import HeaderAuth from '@/src/components/HomeAuth/HeaderAuth/HeaderAuth'
import { Button, Col, Container, Row } from 'reactstrap'
import Footer from '@/src/components/common/Footer/Footer'

export default function profile() {
    return (
        <>
            <Head>
                <title> OneBitFlix - Meus dados </title>
                <link rel="shortcut icon" href="./favicon.svg" type="image/x-icon" />
            </Head>

            <main>
                <div className={styles.header}>
                    <HeaderAuth />
                </div>
                <Container className='py-5'>
                    <p className={styles.title}> Minha conta </p>

                    <Row className='pt-3 pb-5'>
                        <Col md={4} className={styles.btnColumn}>
                            <Button className={styles.renderForm}> DADOS PESSOAIS </Button>
                            <Button className={styles.renderForm}> SENHA </Button>
                        </Col>

                        <Col>
                            <UserForm />
                        </Col>
                    </Row>
                </Container>
                <div className={styles.footer}>
                    <Footer />
                </div>
            </main>
        </>
    )
}
