import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../../styles/profile.module.scss'

export default function UserForm() {
    return (
        <>
            <div>
                <Form className={styles.form}>
                    <div className={styles.formName}>
                        <p className={styles.nameAbreviation}> NT </p>
                        <p className={styles.userName}> NAME TEST </p>
                    </div>

                    <div className={styles.memberTime}>
                        <img
                            src='/profile/iconUserAccount.svg'
                            alt='iconProfile'
                            className={styles.memberTimeImg}
                        />
                        <p className={styles.memberTimeText}>
                            Membro desde <br /> 20 de Abril de 2020
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
                                value={'Name'}
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
                                value={'Test'}
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
                                value={'+55 (11) 91234-5678'}
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
                                value={'teste@gmail.com'}
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
            </div>
        </>
    )
}
