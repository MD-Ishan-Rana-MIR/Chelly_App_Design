"use client";
import React from 'react'
import MaxWidth from './components/max-width/MaxWidth'
import Menu from './components/product/Menu'
import { useAllCategoriesQuery } from './redux/categoryApi';
import { CategoryType } from './lib/type';
import Banner from './components/slider/Banner';
import Button from './components/button/Button';
import Link from 'next/link';
import Image from 'next/image';
import BreakfastProduct from './components/product/BreakfastProduct';
import LunchtimeElevated from './components/product/LunchtimeElevated';
import CoolCrisp from './components/product/CoolCrisp';
import BlogPage from './components/blog/BlogPage';
import Subscriber from './components/subscribe/Subscriber';
import { useRouter } from 'next/navigation';
import TwoMealPlans from './components/product/TwoMealPlans';
import LeftProduct from './components/product/LeftProduct';

const HomePage = () => {
  const { data, isLoading } = useAllCategoriesQuery(undefined);


  const categories: CategoryType[] = data?.data?.data || [];

  const router = useRouter();



  return (
    <div>
      <div>
        <Banner />
      </div>
      <MaxWidth>

        <div className=' my-10 md:my-16 ' >
          <h1 className={`text-center primaryText `} > Fresh Flavors, Nourishing Every Bite </h1>
          <div className={` max-w-3xl mx-auto `} >
            <h1 className={` text-center md:my-4 my-3 font-bold md:text-4xl primaryText `} >Weekly Customizable Meal Prep Delivered to You</h1>
            <h1 className={'text-center font-semibold  primaryText'} >Experience dishes crafted with care, using fresh ingredients to nourish your body and delight your taste buds.Healthy eating has never been this easy — or this satisfying.</h1>
          </div>

          <div className=' flex justify-center mt-3 md:mt-6' >
            <Button text="Start Shooping" onClick={() => { router.push(`/collections/${-1}`) }} />
          </div>
        </div>



        {/* <section className="py-16 bg-white">

          <div className="">

            <div className="text-center mb-12">

              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Explore Our Delicious Menu 🍔
              </h2>

              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                Fresh ingredients, tasty recipes, and fast delivery — choose your favorite meals from our menu and enjoy the best food experience.
              </p>

            </div>

           
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

        </section> */}

        {/* Two Product Section  */}


        <TwoMealPlans />





        <div>
          <Menu />
        </div>


        <div>
          <LeftProduct/>
        </div>

        <div>
          <BreakfastProduct />
        </div>



        <div>
          <CoolCrisp />
        </div>

        <div>
          <LunchtimeElevated />
        </div>

        <div>
          <BlogPage />
        </div>


      </MaxWidth>
      <Subscriber />
    </div>
  )
}

export default HomePage
