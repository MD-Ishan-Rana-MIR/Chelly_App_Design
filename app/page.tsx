import React from 'react'
import MaxWidth from './components/max-width/MaxWidth'
import ProductPage from './components/product/Product'
import HomeFoodGrid from './components/slider/HomeFoodGrid'
import Menu from './components/product/Menu'
import { GrLinkNext } from 'react-icons/gr'
import CategoryCard from './components/card/CategoryCard'

const HomePage = () => {
  return (
    <div>
      <div>
        <HomeFoodGrid />
      </div>
      <MaxWidth>

        <section className="py-16 bg-white">

          <div className="">

            {/* TITLE + DESCRIPTION */}
            <div className="text-center mb-12">

              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Explore Our Delicious Menu 🍔
              </h2>

              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                Fresh ingredients, tasty recipes, and fast delivery — choose your favorite meals from our menu and enjoy the best food experience.
              </p>

            </div>

            {/* MENU GRID */}
            <div className="flex flex-col gap-6">

              {/* ROW 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
                <CategoryCard category = {"breakfast"}  title="Breakfast" icon={<GrLinkNext />} />
                <CategoryCard category = {"lunch"}  title="Lunch" icon={<GrLinkNext />} />
                <CategoryCard category = {"dinner"}  title="Dinner" icon={<GrLinkNext />} />
                <CategoryCard category = {"weekly"}  title="Weekly Subscription" icon={<GrLinkNext />} />
                <CategoryCard category = {"drink"}  title="Drinks" icon={<GrLinkNext />} />
                <CategoryCard category = {"side"}  title="Sides" icon={<GrLinkNext />} />
              </div>
            </div>

          </div>

        </section>

   


        {/* <ProductPage /> */}

        <div>
          <Menu />
        </div>


      </MaxWidth>
    </div>
  )
}

export default HomePage
