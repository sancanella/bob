import styles from '../styles/Card.module.scss'

type Props = {
    name:string;
    bags: number
}

export default function Card({name, bags}: Props) {

    return (
        <div className={styles.card}>
            <h2>{name}</h2>
            <p>Number of bags: {bags}</p>
        </div>
    )

}