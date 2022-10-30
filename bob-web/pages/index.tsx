import Head from 'next/head'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { getBags } from '../requests/UserBagsRequests'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [bags,setBags] = useState<Array<{name:string,bags:number}>>([])
  useEffect(() => {
    getBags().then(res => {
      setBags(res)
    })
  },[]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Bob task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header/>

        <div className={styles.grid}>
           {bags.map((value:any) => {
             return <Card key={value.name+value.Bags} name={value.Name} bags={value.Bags}/>
           })}
        </div>
      </main>

      <Footer/>
    </div>
  )
}
