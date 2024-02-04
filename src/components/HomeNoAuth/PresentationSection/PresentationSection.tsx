import Link from 'next/link'
import styles from './styles.module.scss'
import { Container, Row, Col, Button } from 'reactstrap'

export default function PresentationSection() {
    return (
        <>
            <Container className='py-4'>
                <Row>
                    <Col md className='d-flex flex-column justify-content-center align-items-start'>
                        <p className={styles.subTitle}> ACESSO ILIMITADO </p>
                        <p className={styles.title}>
                            Tenha acesso aos melhores <br />
                            tutoriais de programação.
                        </p>
                        <p className={styles.description}>
                            Estude de onde estiver, a qualquer momento, e continue <br />
                            evoluindo como programador.
                        </p>
                        <Link className='text-decoration-none' href='/register'>
                            <Button className={styles.btnCta}>
                                ACESSE AGORA
                                <img src="/buttonPlay.svg"
                                    alt='buttonImg'
                                    className={styles.btnImg}
                                />
                            </Button>
                        </Link>
                    </Col>
                    <Col md>
                        <img
                            src="/homeNoAuth/imgPresentation.png"
                            alt="img presentation"
                            className={styles.imgPresentation}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-center pt-5'>
                        <img
                            src="/homeNoAuth/iconArrowDown.svg"
                            alt="Arrow Down"
                            className={styles.arrowDown}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
