import { FormEvent, useEffect, useState } from 'react'
import styles from '../../../../styles/profile.module.scss'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import profileService from '@/src/services/profileService'
import ToastComponent from '../../common/ToastComponent/ToastComponent'

export default function PasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [color, setColor] = useState('')
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        profileService.fetchCurrent().then((password) => {
            setCurrentPassword(password.currentPassword)
            setNewPassword(password.newPassword)
        })
    }, [])

    const handlePasswordUpdate = async function (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (newPassword !== confirmNewPassword) {
            setToastIsOpen(true)
            setErrorMessage('Senha e confirmação de senha diferentes!')
            setColor('bg-danger')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)
        
            return
        }

        if (currentPassword === newPassword) {
            setToastIsOpen(true)
            setErrorMessage('A nova senha não pode ser igual a senha antiga!')
            setColor('bg-danger')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)

            return
        }

        const res = await profileService.passwordUpdate({
            currentPassword, 
            newPassword
        })

        if (res === 204) {
            setToastIsOpen(true)
            setErrorMessage('Senha alterada com sucesso!')
            setColor('bg-success')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)
        
            setCurrentPassword('')
            setNewPassword('')
            setConfirmNewPassword('')
        }

        if (res === 401) {
            setToastIsOpen(true)
            setErrorMessage('Senha atual incorreta!')
            setColor('bg-danger')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)
        }
    }

    return (
        <>
            <Form onSubmit={handlePasswordUpdate} className={`${styles.form} pb-5 mb-5`}>
                <div className={styles.inputNormalDiv}>
                    <FormGroup>
                        <Label for='currentPassword' className={styles.label}> SENHA ATUAL </Label>
                        <Input
                            name='currentPassword'
                            type='password'
                            id='currentPassword'
                            placeholder='********'
                            required
                            minLength={6}
                            value={currentPassword}
                            onChange={(event) => setCurrentPassword(event.currentTarget.value)}
                            className={styles.input}
                        />
                    </FormGroup>
                </div>

                <div className={styles.inputFlexDiv}>
                    <FormGroup>
                        <Label for='newPassword' className={styles.label}> NOVA SENHA </Label>
                        <Input
                            name='newPassword'
                            type='password'
                            id='newPassword'
                            placeholder='********'
                            required
                            minLength={6}
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.currentTarget.value)}
                            className={styles.inputFlex}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for='confirmNewPassword' className={styles.label}> NOVA SENHA </Label>
                        <Input
                            name='confirmNewPassword'
                            type='password'
                            id='confirmNewPassword'
                            placeholder='********'
                            required
                            minLength={6}
                            value={confirmNewPassword}
                            onChange={(event) => setConfirmNewPassword(event.currentTarget.value)}
                            className={styles.inputFlex}
                        />
                    </FormGroup>
                </div>

                <div className={`${styles.inputFlexDiv} mt-4`}>
                    <Button className={styles.formBtn} outline type='submit'> Salvar Alterações </Button>
                </div>
            </Form>

            <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage} />
        </>
    )
}
