import React, {FC} from 'react';
import {useGetDataQuery} from "../services/carService";

type TFilters = {
    setFiltered: (post: any) => void,
}
const Filters: FC<TFilters> = ({setFiltered}) => {
    const { data } = useGetDataQuery('')
    const handleFilter = (option:string) => {
        if (option === 'all') {
            setFiltered(data)
        } else {
            let newData = [...data].filter(item => item?.technical_characteristics?.brand === option)
            setFiltered(newData)
        }
    }
    return (
        <div>
            <h1>Фильтры</h1>
            <div>
                {
                    data?.map((item) => (
                        <div key={item.name}>
                            {
                                item.technical_characteristics?.brand &&
                                <button onClick={() => handleFilter(item.technical_characteristics?.brand)} id={item.technical_characteristics?.brand}>{item?.technical_characteristics?.brand}</button>
                            }
                        </div>

                    ))
                }
                <button onClick={() => handleFilter('all')}>Показать все</button>
            </div>
        </div>
    );
};

export default Filters;
