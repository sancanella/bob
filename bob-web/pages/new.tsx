import styles from '../styles/NewPage.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import { createBag } from '../requests/UserBagsRequests'

export default function NewItem() {

    const [bags, setBags ] = useState(0)

    const modifyBags = (more:boolean) =>{
        if(more){
            if(bags >= 5) return
            setBags(bags+1)
        }else{
            //0 is valid?
            if(bags <= 0) return
            setBags(bags-1)
        }
    }

    const [state, setState ] = useState({"dirty":false, "valid":false,"error":false})
    const [name, setName ] = useState("")

    const handleInput = (value:string) => {
        const check = checkInput(value)
        setState({"dirty":true,"valid":check, error:!check })
        setName(value)

    }

    //Maybe shoud be check also in back
    const checkInput = (value:string): boolean => {
        return value.split(" ").filter(str => str.length > 0).length >= 2 
        && value.length > 0
        && value.charCodeAt(0) >= 65
        && value.charCodeAt(0) <= 90
    }

    const save = () => {
        
        if(!checkInput(name) || bags < 0 || bags > 5){
            alert("Error found in form")
            return
        }
        createBag(name,bags).then(res => {
            alert("Created")
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1>Create new item</h1>
                <div className={styles.name}>
                    <p>Name: </p>
                    <input onChange={(e)=> {handleInput(e.target.value)}}/>
                </div>
                <span style={{color: state.valid ? 'green':'red'}} >Must contain 2 or more words and start with uppercase</span>
                <div className={styles.counter}>
                    <p>Bags:</p>
                    <Image onClick={() => modifyBags(false)} src={"/minus.png"} alt={'Minus'} width={20} height={20}/>
                    <p>{bags}</p>
                    <Image onClick={() => modifyBags(true)} src={"/plus.png"} alt={'Plus'} width={20} height={20}/>
                </div>
                <button disabled={! state.valid} className={styles.save} onClick={() => save()}>Save</button>
            </div>
        </div>
    )

}