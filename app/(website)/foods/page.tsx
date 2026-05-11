import MaxWidth from '@/app/components/max-width/MaxWidth'
import ProductPage from '@/app/components/product/Product'
import FoodPageSlider from '@/app/components/slider/FoodPageSlider'
import React from 'react'

const Foods = () => {
    return (
        <div>
            <div className='  ' >
                <FoodPageSlider />
            </div>
            <MaxWidth>

                <ProductPage />
            </MaxWidth>
        </div>
    )
}

export default Foods
