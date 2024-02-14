import styles from './styles.module.scss'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Container, Form, Input } from 'reactstrap'
import ReactModal from 'react-modal'
import { useRouter } from 'next/router'
import profileService from '@/src/services/profileService'

ReactModal.setAppElement('#__next')

export default function HeaderAuth() {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(false)
    const [initials, setInitials] = useState('')

    useEffect(() => {
        profileService.fetchCurrent().then((user) => {
            const firstNameInitial = user.firstName[0]
            const lastNameInitial = user.lastName[0]
            setInitials(firstNameInitial + lastNameInitial)
        })
    }, [])

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const handleLogout = () => {
        sessionStorage.clear()

        router.push('/')
    }

    return (
        <>
            <Container className={styles.nav}>
                <Link href={'/home'}>
                    <img src="/logoOnebitflix.svg" alt="LogoOneBitFlix" className={styles.imgLogoNav} />
                </Link>
                <div className='d-flex align-items-center'>
                    <Form>
                        <Input
                            name='search'
                            type='search'
                            placeholder='Pesquisar'
                            className={styles.input}
                        />
                    </Form>
                    <img
                        src="/homeAuth/iconSearch.svg"
                        alt="lupaHeader"
                        className={styles.searchImage}
                    />
                    <p className={styles.userProfile} onClick={handleOpenModal}>
                        {initials}
                    </p>
                </div>
                <ReactModal
                    isOpen={modalOpen}
                    onRequestClose={handleCloseModal}
                    shouldCloseOnEsc={true}
                    className={styles.modal}
                    overlayClassName={styles.overlayModal}
                >
                    <Link href='/profile' className='text-decoration-none'>
                        <p className={styles.modalLink}> Meus Dados </p>
                    </Link>
                    <p className={styles.modalLink} onClick={handleLogout}> Sair </p>
                </ReactModal>
            </Container>
        </>
    )
}
