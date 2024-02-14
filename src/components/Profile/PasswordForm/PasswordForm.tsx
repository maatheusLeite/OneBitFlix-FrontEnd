import styles from '../../../../styles/profile.module.scss'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

export default function PasswordForm() {
    return (
        <>
            <Form className={`${styles.form} pb-5 mb-5`}>
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
                            className={styles.inputFlex}
                        />
                    </FormGroup>
                </div>

                <div className={`${styles.inputFlexDiv} mt-4`}>
                    <Button className={styles.formBtn} outline> Salvar Alterações </Button>
                </div>
            </Form>
        </>
    )
}
