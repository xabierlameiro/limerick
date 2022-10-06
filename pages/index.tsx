import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import pictureRoute from '../public/xabiymaria.jpg'
import { AiOutlineLinkedin ,AiOutlineFacebook} from 'react-icons/ai';
import Head from 'next/head'

const Home: NextPage = () => {
  return<>
        <Head>
					<title>We are looking for accommodation in Limerick</title>
				</Head>
   <main>
    <Image
        src={pictureRoute}
        className={styles.picture}
        placeholder="blur"
        alt="Xabi y María"
        width={380}
        height={380}
        quality={100}
        objectFit="contain"
        priority
      />
      <h1>Hola &#128075; somos Xabi y María.</h1>
      <p>Somos una pareja que busca alojamiento en <a href="https://www.google.com/maps/place/Limerick,+Irlanda/@52.6515619,-8.6651593,13z/data=!3m1!4b1!4m5!3m4!1s0x485b5c611f545113:0xa00c7a997317330!8m2!3d52.6638367!4d-8.6267343" target="_blank" rel="noreferrer">Limerick</a>, para una estancía de <span>larga duración</span>.</p>
      <p>Nuestro objetivo es conocer Irlanda, aprender y prácticar inglés a la vez que seguimos con nuestra vida habitual, trabajar como programador en mi caso y
       estudiar para las oposiciones de profesora de Infantil en el caso de María.</p>
       <p>Somos de Galicia (España) y tenemos 32 y 31 años respectivamente, somos personas tranquilas, nos gustan los animales y no somos fumadores.</p>
       <p>Llegaremos a Irlanda el 23 de Octubre de 2022 y tenemos alojamiento <span className={styles.underlined}>solo para 2 semanas.</span> 
       </p><p>Nos gustaría alquilar un apartamento de una habitación o un espacio en una vivienda compartida por esta zona si es posible:</p>
       <iframe title="This is the map where you can see the preferred zone" className={styles.map} src="https://maps.google.com/maps?q=52.65945039377984,%20-8.631359605893005&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} />
       <p>Si conoces a alguien que busque compañeros de piso, o simplemente eres un arrendador dispuesto a conocernos, no dudes en ponerte en contacto con nosotros.</p>
       <ul>
        <li>Escribenos un correo a <a href="mailto:xabier.lameiro@gmail.com">Xabi</a> o <a href="mailto:maria.otero.ces@gmail.com">María</a> </li>
        <li>Mejor Whastapp ? <a href="https://wa.me/+34603018268/?text=Hi, I saw you on www.couplelookinghomeinlimerick.com">Envíar mensaje</a>
</li>
       </ul>
  </main>
  <footer>
  <a href="https://www.linkedin.com/in/xlameiro/" target="_blank" rel="noreferrer" className={styles.icon}><AiOutlineLinkedin title="Link to Xabier Linkedin" size="2em"/></a>
  <a href="https://www.facebook.com/mariajose.oteroces" target="_blank" rel="noreferrer"className={styles.icon}><AiOutlineFacebook title="Link to Maria Facebook" size="2em"/></a>
  </footer>
  </>
}

export default Home
