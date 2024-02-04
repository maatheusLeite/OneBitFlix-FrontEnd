import HeaderAuth from '../src/components/HomeAuth/HeaderAuth/HeaderAuth';
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'
import React from 'react'

export default function Home() {
    return (
        <>
            <Head>
                <title> OneBitFlix - Home </title>
                <link rel="shortcut icon" href="./favicon.svg" type="image/x-icon" />
            </Head>

            <main>
                <HeaderAuth />
            </main>
        </>
    )
}
