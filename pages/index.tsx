import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import pictureRoute from '../public/xabiymaria.jpeg'

const Home: NextPage = () => {
  return <main>
    <Image
        src={pictureRoute}
        className={styles.picture}
        alt="Xabi y María"
        width={400}
        height={400}
        quality={100}
        objectFit="contain"
        blurDataURL="data:..." 
        placeholder="blur" 
      />
       <h1>Hola &#128075;, somos Xabi y María.</h1>
      <p>Somos una pareja que busca <strong>alojamiento</strong> en Limerick (Irlanda), para una estancía de <span>larga duración</span></p>
      <p>Nuestro objetivo es conocer Irlanda y aprender y prácticar inglés a la vez que hacemos nuestra vida normal, seguir trabajando como programador en mi caso y
      María estudiar para las oposiciones de profe de Infantil para el sector público.</p>
  </main>
}

export default Home
