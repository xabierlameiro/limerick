
import styles from '../../styles/Home.module.css'

export const Map = () => {
    return <iframe 
                title="This is the map where you can see the preferred zone in Limerick city" 
                className={styles.map} 
                src="https://maps.google.com/maps?q=52.65945039377984,%20-8.631359605893005&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                />
}