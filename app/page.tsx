import React from 'react'
import MenuCard from './components/card/MenuCard'
import { GrLinkNext } from 'react-icons/gr'
import MaxWidth from './components/max-width/MaxWidth'
import ProductPage from './components/product/Product'
import HomeFoodGrid from './components/slider/HomeFoodGrid'
import Menu from './components/product/Menu'

const HomePage = () => {
  return (
    <div>
      <div>
        <HomeFoodGrid />
      </div>
      <MaxWidth>

        <div className="flex flex-col gap-6">

          {/* ROW 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6">

            <MenuCard title="Breakfast" icon={<GrLinkNext />} />
            <MenuCard title="Lunch" icon={<GrLinkNext />} />
            <MenuCard title="Dinner" icon={<GrLinkNext />} />

          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <MenuCard title="Weekly Subscription" icon={<GrLinkNext />} />
            <MenuCard title="Drinks" icon={<GrLinkNext />} />
            <MenuCard title="Sides" icon={<GrLinkNext />} />

          </div>

        </div>

        {/* Product Card  */}


        <ProductPage />

        <div>
          <Menu />
        </div>


      </MaxWidth>
    </div>
  )
}

export default HomePage
