import React, {FC} from 'react';
import styles from './user.module.scss'
import {TPost} from "./FormContainer";
import {useDeletePostMutation, useUpdatePostMutation} from "../services/carService";

type TUserItemProps = {
    post: TPost,
}
const CarItem : FC<TUserItemProps>= ({post}) => {
    const [updatePost] = useUpdatePostMutation()
    const [deletePost] = useDeletePostMutation()
    const handleRemove = (event:any) => {
        event.stopPropagation()
        deletePost(post)
    }
    const updateRemove = (event:any) => {
        const data = event.target.getAttribute('data-input')
        console.log('data',data)
        const name = prompt() || ''
        updatePost({...post, [data]:name})
    }


    return (
        <div className={styles.list__content}>
            <div className={styles.list__item}  key={post.id}>
                <div className={styles.list__headItem} data-input="name" onClick={updateRemove}>{post.name}</div>
                <div className={styles.list__headItem} data-input="description" onClick={updateRemove}>{post.description}</div>
                <div className={styles.list__headItem} data-input="price" onClick={updateRemove}>{post.price}</div>
                <div className={styles.list__headItem} data-input="images" onClick={updateRemove}>
                    {
                        post?.images?.map((img:string) => (
                            <div key={img}>
                                {img}
                            </div>
                        ))
                    }
                </div>
                <div className={styles.list__headItem} data-input="contacts" onClick={updateRemove}>{post.contacts}</div>
                <div className={styles.list__headItem} data-input="brand" onClick={updateRemove}>{post.technical_characteristics?.brand}</div>
                <div className={styles.list__headItem} data-input="model" onClick={updateRemove}>{post.technical_characteristics?.model}</div>
                <div className={styles.list__headItem} data-input="productionYear" onClick={updateRemove}>{post.technical_characteristics?.productionYear}</div>
                <div className={styles.list__headItem} data-input="mileage" onClick={updateRemove}>{post.technical_characteristics?.mileage}</div>
                <div className={styles.list__headItem} data-input="options" onClick={updateRemove}>
                    {
                        post?.options?.map((option:any) => (
                            <div key={option?.option_name}>
                                {option?.option_name}
                            </div>
                        ))
                    }
                </div>

                <div className={styles.list__headItem} >
                    <button onClick={handleRemove}>Удалить</button>
                </div>

            </div>
        </div>

    );
};

export default CarItem;

