"use client"

import { ArrowRight } from 'lucide-react';
import MaxWidth from '@/app/components/max-width/MaxWidth';
import { useGetAllCollectionQuery } from '@/app/redux/collectionApi';
import { CollectionItem } from '@/app/lib/type';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import CollectionByProduct from '@/app/components/product/CollectionByProduct';

export default function CategoryGrid() {
  const params = useParams();

  

  const { data, isLoading, error } = useGetAllCollectionQuery({});
  const collectionData: CollectionItem[] = data?.data || [];

  const [id, setId] = useState<null | number>(() => {
    if (typeof params?.link === 'string') {
      const parsedId = Number(params.link);
      return !isNaN(parsedId) ? parsedId : null;
    }
    return null;
  });

  // Error state layout fallback
  if (error) {
    return (
      <div className="w-full bg-white my-6 md:my-16 px-4 md:px-0 text-center text-red-500 font-medium">
        Failed to load categories. Please try again later.
      </div>
    );
  }

  return (
    <div className="w-full bg-white my-6 md:my-16 px-4 md:px-0">
      <MaxWidth>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">

          {/* Skeleton Loader State */}
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="w-full py-4 md:py-0 md:aspect-[4.8/1] bg-[#F5F9F5] rounded-xl px-4 flex items-center justify-between animate-pulse"
              >
                <div className="h-5 bg-gray-200 rounded-md w-1/2 sm:w-2/3"></div>
                <div className="h-4 w-4 bg-gray-200 rounded-full shrink-0"></div>
              </div>
            ))
          ) : (
            // Actual Data State
            collectionData.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => { setId(item?.id) }}

                className="group w-full py-4 md:py-0 md:aspect-[4.8/1] bg-[#F5F9F5] rounded-xl px-4 flex items-center justify-start text-[#137333] hover:bg-[#eaf2ea] transition-colors duration-200"
              >
                <div className="flex items-center justify-between w-full md:w-auto md:justify-start gap-1.5 text-left">
                  <span className="font-medium text-base sm:text-lg whitespace-nowrap cursor-pointer">
                    {item?.name}
                  </span>

                  <div className="flex items-center transition-all duration-300 ease-out group-hover:translate-x-1.5 group-hover:scale-x-125 origin-left">
                    <ArrowRight size={16} className="shrink-0 cursor-pointer" />
                  </div>
                </div>
              </button>
            ))
          )}

        </div>
        <div>
          <CollectionByProduct id = {id} />
        </div>
      </MaxWidth>
    </div>
  );
}