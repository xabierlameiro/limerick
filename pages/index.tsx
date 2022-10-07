import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import pictureRoute from '../public/xabiymaria.jpg'
import { AiOutlineLinkedin ,AiOutlineFacebook} from 'react-icons/ai';
import Head from 'next/head'
import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() =>
  import('../components/map').then((mod) => mod.Map)
)

const Home: NextPage = () => {
  return<>
        <Head>
					<title>We are looking for accommodation in Limerick</title>
				</Head>
      <header>
        <section className={styles.imageWrapper}>
          <Image
              alt="Xabi and María looking home in Limerick city"
              src={pictureRoute}
              priority
              className={styles.picture}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
            />
            </section>
      </header>
      <main>
      <h1>Hello &#128075; we are Xabi and María!</h1>
      <article>
        <h2>We are a couple looking for accommodation in <a onClick={()=>(window as any).gtag('event', 'Limerick link', {'event_category' : 'click','event_label' : 'Click on Limerick map link'})} href="https://www.google.com/maps/place/Limerick,+Irlanda/@52.6515619,-8.6651593,13z/data=!3m1!4b1!4m5!3m4!1s0x485b5c611f545113:0xa00c7a997317330!8m2!3d52.6638367!4d-8.6267343" target="_blank" rel="noreferrer">Limerick</a>, for a stay of <span>long duration</span>.</h2>
        <p>Our aim is to get to know Ireland, learn and practice English while continuing with our usual life, working as a programmer in my case and
        studying for the competitive examinations to become an Kindergarten teacher in Maria&apos;s case.</p>
        <p>We are from Galicia (Spain) and we are 32 and 31 years old respectively, we are quiet people, we like animals and we are not smokers.</p>
        <p>We will arrive in Ireland on 23 October 2022 and we have accommodation. <span className={styles.underlined}>only for 2 weeks.</span> 
        </p><p>We would like to rent a one-bedroom flat or a shared living space in this area if possible:</p>
        <DynamicMap />
        <p>If you know someone who is looking for flatmates, or you are simply a landlord willing to get to know us, please do not hesitate to contact us.</p>
       </article>
       <aside>
       <ul>
          <li>Email us at <a onClick={()=>(window as any).gtag('event', 'Mail to', {'event_category' : 'click','event_label' : 'Sending mail to xabier.lameiro@gmail.com'})} href="mailto:xabier.lameiro@gmail.com">Xabi</a> o <a onClick={()=>(window as any).gtag('event', 'Mail to', {'event_category' : 'click','event_label' : 'Sending mail to maria.otero.ces@gmail.com'})} href="mailto:maria.otero.ces@gmail.com">María</a> </li>
          <li>Better Whastapp ? <a onClick={()=>(window as any).gtag('event', 'Whatsapp', {'event_category' : 'click','event_label' : 'Sending whatsapp to Xabier'})} href="https://wa.me/+34603018268/?text=Hi,%20I%20saw%20you%20on%20www.couplelookinghomeinlimerick.com">Send message</a></li>
       </ul>
       </aside>
  </main>
  <footer>
  <a onClick={()=>(window as any).gtag('event', 'Linkedin', {'event_category' : 'click','event_label' : 'Go to Xabier Linkedin profile'})} href="https://www.linkedin.com/in/xlameiro/" target="_blank" rel="noreferrer" className={styles.icon}><AiOutlineLinkedin title="Link to the developer Xabier's Linkedin profile" size="2em"/></a>
  <a onClick={()=>(window as any).gtag('event', 'Facebook', {'event_category' : 'click','event_label' : 'Go to Maria Facebook profile'})} href="https://www.facebook.com/mariajose.oteroces" target="_blank" rel="noreferrer"className={styles.icon}><AiOutlineFacebook title="Link to Maria Facebook profile" size="2em"/></a>
  </footer>
  </>
}

export default Home
