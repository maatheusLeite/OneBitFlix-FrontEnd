import HeaderGeneric from '@/src/components/common/HeaderGeneric/HeaderGeneric'
import styles from '../styles/registerLogin.module.scss'
import Head from 'next/head'
import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import Footer from '@/src/components/common/Footer/Footer'
import { FormEvent, useState } from 'react'
import authService from '@/src/services/authService'
import { useRouter } from 'next/router'
import ToastComponent from '@/src/components/common/ToastComponent/ToastComponent'

export default function Register() {
    const router = useRouter()
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget) // pega os valores dos inputs da pagina
        const firstName = formData.get("firstName")!.toString()
        const lastName = formData.get("lastName")!.toString()
        const phone = formData.get("phone")!.toString()
        const birth = formData.get("birth")!.toString()
        const email = formData.get("email")!.toString()
        const password = formData.get("password")!.toString()
        const confirmPassword = formData.get("confirmPassword")!.toString()

        const params = {
            firstName,
            lastName,
            phone,
            birth,
            email,
            password
        }

        if (password != confirmPassword) {
            setToastIsOpen(true)
            setToastMessage('A senha e confirmação de senha porecisam ser iguais!')

            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3) // 3 segundos

            return
        }

        const { data, status } = await authService.register(params)

        if (status === 201) {
            router.push('/login?registered=true')
        }
        else {
            setToastIsOpen(true)
            setToastMessage(data.message)

            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3) // 3 segundos
        }
    }

    return (
        <>
            <Head>
                <title> OneBitFlix - Registro </title>
                <link rel="shortcut icon" href="./favicon.svg" type="image/x-icon" />
                { /* eslint-disable-next-line @next/next/no-sync-scripts*/}
                <script src="https://jsuites.net/v4/jsuites.js"></script>
            </Head>

            <main className={styles.main}>
                <HeaderGeneric
                    logoUrl='/'
                    btnUrl='/login'
                    btnContent='Quero fazer login'
                />
                <Container className='py-5'>
                    <p className={styles.formTitle}>
                        <strong> Bem vindo(a) ao OneBitFlix! </strong>
                    </p>
                    <Form className={styles.form} onSubmit={handleRegister}>
                        <p className='text-center'>
                            <strong> Faça a sua conta! </strong>
                        </p>
                        <FormGroup>
                            <Label for='firstName' className={styles.label} >
                                NOME
                            </Label>
                            <Input
                                id='firstName'
                                name='firstName'
                                type='text'
                                placeholder='Qual é o seu nome?'
                                required
                                maxLength={25}
                                className={styles.inputName}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for='lastName' className={styles.label} >
                                SOBRENOME
                            </Label>
                            <Input
                                id='lastName'
                                name='lastName'
                                type='text'
                                placeholder='Qual é o seu sobrenome?'
                                required
                                maxLength={25}
                                className={styles.inputName}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for='phone' className={styles.label} >
                                WHATSAPP / TELEGRAM
                            </Label>
                            <Input
                                id='phone'
                                name='phone'
                                type='tel'
                                placeholder='(xx) 9xxxx-xxxx'
                                data-mask="[-]+55 (00) 00000-0000"
                                required
                                className={styles.input}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for='email' className={styles.label} >
                                E-MAIL
                            </Label>
                            <Input
                                id='email'
                                name='email'
                                type='email'
                                placeholder='Digite o seu email'
                                required
                                className={styles.input}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for='birth' className={styles.label} >
                                DATA DE NASCIMENTO
                            </Label>
                            <Input
                                id='birth'
                                name='birth'
                                type='date'
                                min='1930-01-01'
                                max='2022-12-31'
                                required
                                className={styles.input}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for='password' className={styles.label} >
                                SENHA
                            </Label>
                            <Input
                                id='password'
                                name='password'
                                type='password'
                                placeholder='Digite a sua senha'
                                required
                                minLength={6}
                                className={styles.input}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for='confirmPassword' className={styles.label} >
                                CONFIRME A SUA SENHA
                            </Label>
                            <Input
                                id='confirmPassword'
                                name='confirmPassword'
                                type='password'
                                placeholder='Confirme a sua senha'
                                required
                                minLength={6}
                                className={styles.input}
                            />
                        </FormGroup>
                        <Button type='submit' outline className={styles.formBtn} >
                            CADASTRAR
                        </Button>
                    </Form>
                </Container>
                <Footer />
                <ToastComponent
                    color='bg-danger'
                    isOpen={toastIsOpen}
                    message={toastMessage}
                />
            </main>
        </>
    )
}
