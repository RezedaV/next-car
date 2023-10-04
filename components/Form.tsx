import React, {useState} from 'react';
import styles from "./user.module.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import {nanoid} from "nanoid";
import {TPost} from "./FormContainer";
import {useCreatePostMutation} from "../services/carService";

const Form = () => {
    const defaultValue:TPost= {
        brand: "",
        contacts: "",
        description: "",
        id: "",
        images: [],
        mileage: 0,
        model: "",
        name: "",
        options: [],
        price: 0,
        productionYear: 0,
    }

    const { register,
        handleSubmit,
        reset,
        formState: { errors}
    } = useForm<TPost>()

    const [isShowSpecifications, setIsShowSpecifications] = useState<boolean>(false)
    const [createPost] = useCreatePostMutation()

    const handleShow = () => {
        setIsShowSpecifications(!isShowSpecifications)
    }
    const onSubmit: SubmitHandler<TPost> =  (data) => {
        const {
            name,
            description,
            price,
            images,
            contacts,
            brand,
            model,
            productionYear,
            mileage,
            options
        } = data
        const newData = {
            ...data,
            id: nanoid(4),
            name:name,
            description:description,
            price:price,
            images:[images],
            contacts:contacts,
            technical_characteristics: {
                car_id: nanoid(4),
                brand:brand,
                model:model,
                productionYear:productionYear,
                mileage:mileage,
            },
            options: [{
                ['option_name']: options
            }]
        }

        createPost(newData)
        reset(defaultValue)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <label>Name*</label>
                <input {...register("name" , { required: true })} />

                <label>Description*</label>
                <input {...register("description",{ required: true })} />

                <label>Price*</label>
                <input type="number" {...register("price",{ required: true })} />

                <label>Photo*</label>
                <input {...register("images",{ required: true })} />

                <label>Contacts*</label>
                <input {...register("contacts",{ required: true })} />

                <div>
                    <input type="checkbox" id="addSpecifications" name="addSpecifications" onClick={handleShow}/>
                    <label htmlFor="addSpecifications">Добавить технические характеристики</label>
                </div>


                {
                    isShowSpecifications &&
                    <>
                        <label>brand*</label>
                        <input {...register("brand",{ required: isShowSpecifications })} />
                        <label>model*</label>
                        <input {...register("model",{ required: isShowSpecifications })} />
                        <label>productionYear*</label>
                        <input type="number" {...register("productionYear",{ required: isShowSpecifications })} />
                        <label>mileage*</label>
                        <input type="number" {...register("mileage",{ required: isShowSpecifications })} />
                    </>
                }

                <label>Options</label>
                <input {...register("options")} />

                <button className={styles.form__button} type="submit">Добавить авто</button>

                {(errors.name || errors.description || errors.price || errors.images || errors.contacts || errors.brand || errors.model || errors.productionYear || errors.mileage)
                    && <p className={styles.error_text}>Пожалуйста заполните поле</p>}
            </form>
    );
};

export default Form;
