import type { Metadata } from 'next'
import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata: Metadata = {
    title: 'OneBitFlix',
    description: 'Tenha acesso aos melhores cursos de programação de uma forma simples e fácil!',
    icons: './favicon.svg'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-br">
            <body>{children}</body>
        </html>
    )
}