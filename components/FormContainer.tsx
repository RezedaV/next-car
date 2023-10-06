import React, {useEffect, useState} from 'react';
import {useGetDataQuery,} from "../services/carService";
import CarItem from "./CarItem";
import styles from './user.module.scss'
import Filters from "./Filters";
import Form from "./Form";



export type  TPost = {
    id: string
    name: string
    description: string
    price: number
    images: []
    contacts: string
    brand?: string
    model?: string
    productionYear?: number
    mileage?: number
    options?: []
}
const FormContainer = () => {
    const { data, error, isLoading } = useGetDataQuery('')
    const [filtered, setFiltered] = useState(data)

    useEffect(() => {
        setFiltered(data)
    },[data])


    return (
        <div>
            <Form/>
            <Filters setFiltered={setFiltered}/>

            <div className={styles.list}>
                <div className={styles.list__head}>
                    <div className={styles.list__headItem}>name</div>
                    <div className={styles.list__headItem}>description</div>
                    <div className={styles.list__headItem}>price</div>
                    <div className={styles.list__headItem}>images</div>
                    <div className={styles.list__headItem}>contacts</div>
                    <div className={styles.list__headItem}>brand</div>
                    <div className={styles.list__headItem}>model</div>
                    <div className={styles.list__headItem}>productionYear</div>
                    <div className={styles.list__headItem}>mileage</div>
                    <div className={styles.list__headItem}>options</div>
                    <div className={styles.list__headItem}></div>
                </div>

                {error ? (
                    <>Oh no, there was an error</>
                ) : isLoading ? (
                    <>Loading...</>
                ) : filtered && (
                    filtered.map((i:TPost) =>
                        <CarItem key={i.id} post={i}/>
                    )
                ) }

            </div>

        </div>
    );
};

export default FormContainer;
