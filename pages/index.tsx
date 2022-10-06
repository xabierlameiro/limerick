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
        objectFit="contain"
      />
      <h1>Hello &#128075; we are Xabi and María.</h1>
      <p>We are a couple looking for accommodation in <a href="https://www.google.com/maps/place/Limerick,+Irlanda/@52.6515619,-8.6651593,13z/data=!3m1!4b1!4m5!3m4!1s0x485b5c611f545113:0xa00c7a997317330!8m2!3d52.6638367!4d-8.6267343" target="_blank" rel="noreferrer">Limerick</a>, for a stay of <span>long duration</span>.</p>
      <p>Our aim is to get to know Ireland, learn and practice English while continuing with our usual life, working as a programmer in my case and
      studying for the competitive examinations to become an Early Childhood teacher in Maria's case.</p>
       <p>We are from Galicia (Spain) and we are 32 and 31 years old respectively, we are quiet people, we like animals and we are not smokers.</p>
       <p>We will arrive in Ireland on 23 October 2022 and we have accommodation. <span className={styles.underlined}>only for 2 weeks.</span> 
       </p><p>We would like to rent a one-bedroom flat or a shared living space in this area if possible:</p>
       <iframe title="This is the map where you can see the preferred zone" className={styles.map} src="https://maps.google.com/maps?q=52.65945039377984,%20-8.631359605893005&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} />
       <p>If you know someone who is looking for flatmates, or you are simply a landlord willing to get to know us, please do not hesitate to contact us.</p>
       <ul>
        <li>Email us at <a href="mailto:xabier.lameiro@gmail.com">Xabi</a> o <a href="mailto:maria.otero.ces@gmail.com">María</a> </li>
        <li>Better Whastapp ? <a href="https://wa.me/+34603018268/?text=Hi, I saw you on www.couplelookinghomeinlimerick.com">Send message</a>
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
