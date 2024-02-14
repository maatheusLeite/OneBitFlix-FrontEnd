import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../../styles/profile.module.scss'
import { FormEvent, useEffect, useState } from 'react'
import profileService from '@/src/services/profileService'
import ToastComponent from '../../common/ToastComponent/ToastComponent'
import { useRouter } from 'next/router'

export default function UserForm() {
    const router = useRouter()

    const [color, setColor] = useState('')
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [initialEmail, setInitialEmail] = useState('')
    const [createdAt, setCreatedAt] = useState('')

    const date = new Date(createdAt)
    const month = date.toLocaleDateString('default', { month: 'long' })
    console.log(email)

    useEffect(() => {
        profileService.fetchCurrent().then((user) => {
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setPhone(user.phone)
            setEmail(user.email)
            setInitialEmail(user.email)
            setCreatedAt(user.createdAt)
        })
    }, [])

    const handleUserUpdate = async function (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const res = await profileService.userUpdate({
            firstName,
            lastName,
            phone,
            email,
            created_at: createdAt
        })

        if (res === 200) {
            setToastIsOpen(true)
            setErrorMessage('Informações alteradas com sucesso!')
            setColor("bg-success")
            setTimeout(() => setToastIsOpen(false), 1000 * 3)
            if (email !== initialEmail) {
                sessionStorage.clear() // remove o jwt ao atualizar o email
                router.push('/')
            }
        }
        else {
            setToastIsOpen(true)
            setErrorMessage('Você não pode mudar para este email!')
            setColor("bg-danger")
            setTimeout(() => setToastIsOpen(false), 1000 * 3)
        }
    }

    return (
        <>
            <Form className={styles.form} onSubmit={handleUserUpdate}>
                <div className={styles.formName}>
                    <p className={styles.nameAbreviation}> {`${firstName[0]}${lastName[0]}`} </p>
                    <p className={styles.userName}> {`${firstName} ${lastName}`} </p>
                </div>

                <div className={styles.memberTime}>
                    <img
                        src='/profile/iconUserAccount.svg'
                        alt='iconProfile'
                        className={styles.memberTimeImg}
                    />
                    <p className={styles.memberTimeText}>
                        Membro desde <br /> {`${date.getDate()} de ${month} de ${date.getFullYear()}`}
                    </p>
                </div>

                <hr />

                <div className={styles.inputFlexDiv}>
                    <FormGroup>
                        <Label for='firstName' className={styles.label} >
                            NOME
                        </Label>
                        <Input
                            name='firstName'
                            type='text'
                            id='firstName'
                            placeholder='Qual o seu primeiro nome?'
                            required
                            maxLength={20}
                            className={styles.inputFlex}
                            value={firstName}
                            onChange={ (event) => setFirstName(event.target.value) }
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for='lastName' className={styles.label} >
                            SOBRENOME
                        </Label>
                        <Input
                            name='lastName'
                            type='text'
                            id='lastName'
                            placeholder='Qual o seu sobrenome?'
                            required
                            maxLength={20}
                            className={styles.inputFlex}
                            value={lastName}
                            onChange={ (event) => setLastName(event.target.value) }
                        />
                    </FormGroup>
                </div>

                <div className={styles.inputNormalDiv}>
                    <FormGroup>
                        <Label for='phone' className={styles.label} >
                            WHATSAPP / TELEGRAM
                        </Label>
                        <Input
                            name='phone'
                            type='tel'
                            id='phone'
                            placeholder='(xx) 9xxxx-xxxx'
                            required
                            className={styles.input}
                            value={phone}
                            onChange={ (event) => setPhone(event.target.value) }
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for='email' className={styles.label} >
                            EMAIL
                        </Label>
                        <Input
                            name='email'
                            type='email'
                            id='email'
                            placeholder='Insira seu email'
                            required
                            className={styles.input}
                            value={email}
                            onChange={ (event) => setEmail(event.target.value) }
                        />
                    </FormGroup>

                    <Button
                        className={styles.formBtn}
                        outline
                        type='submit'
                    >
                        Salvar Alterações
                    </Button>
                </div>
            </Form>

            <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage} />
        </>
    )
}
