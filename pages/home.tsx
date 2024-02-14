import FeaturedSection from '@/src/components/HomeAuth/FeaturedSection/FeaturedSection';
import HeaderAuth from '../src/components/HomeAuth/HeaderAuth/HeaderAuth';
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'
import React from 'react'
import NewestCategory from '@/src/components/HomeAuth/NewestCategory/NewestCategory';
import FavoriteCategory from '@/src/components/HomeAuth/FavoriteCatogory/FavoriteCategory';
import FeaturedCategory from '@/src/components/HomeAuth/FeaturedCategory/FeaturedCategory';
import CategoriesList from '@/src/components/HomeAuth/CategoriesList/CategoriesList';
import Footer from '@/src/components/common/Footer/Footer';

export default function HomeAuth() {
    return (
        <>
            <Head>
                <title> OneBitFlix - Home </title>
                <link rel="shortcut icon" href="./favicon.svg" type="image/x-icon" />
            </Head>

            <main>
                <FeaturedSection />
                <NewestCategory />
                <FavoriteCategory />
                <FeaturedCategory />
                <CategoriesList />
                <Footer />
            </main>
        </>
    )
}
