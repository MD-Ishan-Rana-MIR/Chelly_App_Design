"use client";
import React from 'react'
import MaxWidth from './components/max-width/MaxWidth'
import Menu from './components/product/Menu'
import { GrLinkNext } from 'react-icons/gr'
import CategoryCard from './components/card/CategoryCard'
import { useAllCategoriesQuery } from './redux/categoryApi';
import { CategoryType } from './lib/type';
import CategoryCardSkeleton from './components/skeleton/CategoryCardSkeleton';
import Banner from './components/slider/Banner';

const HomePage = () => {
  const { data, isLoading } = useAllCategoriesQuery(undefined);


  const categories: CategoryType[] = data?.data?.data || [];



  return (
    <div>
      <div>
        <Banner />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {isLoading ? (
                Array.from({ length: 9 }).map((_, i) => (
                  <CategoryCardSkeleton key={i} />
                ))
              ) : (
                categories?.map((item) => (
                  <CategoryCard
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    icon={<GrLinkNext />}
                  />
                ))
              )}
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
