import styles from '../styles/registerLogin.module.scss'
import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'
import HeaderGeneric from '../src/components/common/HeaderGeneric/HeaderGeneric'
import React, { FormEvent, useEffect, useState } from 'react'
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import Footer from '../src/components/common/Footer/Footer'
import { useRouter } from 'next/router'
import ToastComponent from '@/src/components/common/ToastComponent/ToastComponent'
import authService from '@/src/services/authService'

export default function Login() {
    const router = useRouter()
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastColor, setToastColor] = useState('')

    useEffect(() => {
        const registerSuccess = router.query.registered // querry passada na url

        if (registerSuccess === "true") {
            setToastColor('bg-success')
            setToastIsOpen(true)
            setToastMessage('Cadastrado com sucesso!')

            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3) // 3 segundos
        }
    }, [router.query])

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget) // pega os valores dos inputs da pagina
        const email = formData.get('email')!.toString()
        const password = formData.get('password')!.toString()
        const params = {email, password}

        const { status } = await authService.login(params)

        if (status === 200) {
            router.push('/home')
        }
        else {
            setToastColor('bg-danger')
            setToastIsOpen(true)
            setToastMessage('Email ou senha incorretos!')

            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3) // 3 segundos
        }
    }

    return (
        <>
            <Head>
                <title> OneBitFlix - Login </title>
                <title> OneBitFlix - Registro </title>
                <link rel="shortcut icon" href="./favicon.svg" type="image/x-icon" />
            </Head>

            <main className={styles.main}>
                <HeaderGeneric
                    logoUrl='/'
                    btnUrl='/register'
                    btnContent='Quero fazer parte'
                />

                <Container className='py-5'>
                    <p className={styles.formTitle}> Bem vindo(a) de volta! </p>
                    <Form className={styles.form} onSubmit={handleLogin}>
                        <p className='text-center'>
                            <strong> Bem vindo(a) ao OneBitFlix! </strong>
                        </p>

                        <FormGroup>
                            <Label for='email' className={styles.label}>
                                E-MAIL
                            </Label>
                            <Input
                                id='email'
                                name='email'
                                type='email'
                                placeholder='Digite seu email'
                                required
                                className={styles.input}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for='password' className={styles.label}>
                                SENHA
                            </Label>
                            <Input
                                id='password'
                                name='password'
                                type='password'
                                placeholder='Digite sua senha'
                                required
                                className={styles.input}
                            />
                        </FormGroup>

                        <Button type='submit' outline className={styles.formBtn}>
                            ENTRAR
                        </Button>
                    </Form>
                </Container>
                <Footer />
                <ToastComponent
                    color={toastColor}
                    isOpen={toastIsOpen}
                    message={toastMessage}
                />
            </main>
        </>
    )
}
