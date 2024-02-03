import HeaderGeneric from '@/src/components/common/HeaderGeneric/HeaderGeneric'
import styles from '../styles/registerLogin.module.scss'
import Head from 'next/head'
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function register() {
    return (
        <>
            <Head>
                <title> OneBitFlix - Registro </title>
                <link rel="shortcut icon" href="./favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <HeaderGeneric
                    logoUrl='/'
                    btnUrl='/login'
                    btnContent='Quero fazer login'
                />
            </main>
        </>
    )
}
