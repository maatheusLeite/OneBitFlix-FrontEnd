import '../styles/globals.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Head from "next/head"
import styles from '../styles/profile.module.scss'
import UserForm from "@/src/components/Profile/UserForm/UserForm"
import HeaderAuth from '@/src/components/HomeAuth/HeaderAuth/HeaderAuth'
import { Button, Col, Container, Row } from 'reactstrap'
import Footer from '@/src/components/common/Footer/Footer'
import { useState } from 'react'
import PasswordForm from '@/src/components/Profile/PasswordForm/PasswordForm'

export default function profile() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form, setForm] = useState('userForm')

    return (
        <>
            <Head>
                <title> OneBitFlix - Meus dados </title>
                <link rel="shortcut icon" href="./favicon.svg" type="image/x-icon" />
            </Head>

            <main className={styles.main}>
                <div className={styles.header}>
                    <HeaderAuth />
                </div>
                <Container className={styles.gridContainer}>
                    <p className={styles.title}> Minha conta </p>

                    <Row className='pt-3 pb-5'>
                        <Col md={4} className={styles.btnColumn}>
                            <Button
                                className={styles.renderForm}
                                style={{ color: form === 'userForm' ? '#ff0044' : '#f9f9f9' }}
                                onClick={() => setForm('userForm')}
                            >
                                DADOS PESSOAIS
                            </Button>
                            <Button
                                className={styles.renderForm}
                                style={{ color: form === 'passwordForm' ? '#ff0044' : '#f9f9f9' }}
                                onClick={() => setForm('passwordForm')}
                            >
                                SENHA
                            </Button>
                        </Col>

                        <Col>
                            {form === 'userForm' ? <UserForm /> : <PasswordForm />}
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
