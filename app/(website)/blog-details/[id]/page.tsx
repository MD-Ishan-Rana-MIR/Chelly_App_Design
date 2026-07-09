"use client"
import MaxWidth from '@/app/components/max-width/MaxWidth'
import BlogDetailsSkeleton from '@/app/components/skeleton/BlogDetailsSkeleton';
import { useBlogDetailsQuery } from '@/app/redux/blogApi';
import { useParams } from 'next/navigation';
import React from 'react'

const BlogDetailsPage = () => {
    const params = useParams();
    const id = params?.id;
    const { data,isLoading } = useBlogDetailsQuery(id);

    const blogData = data?.data;

    // Dynamically generate the current page URL for sharing
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = blogData?.title || 'Check out this blog post!';

    if(isLoading){
        return <BlogDetailsSkeleton/>
    }

    return (
        <div className='md:my-18 my-8'>
            <MaxWidth>
                <div className='max-w-3xl mx-auto'>
                    {/* Title */}
                    <h1 className='md:text-4xl font-bold text-[#10710F] mb-3'>
                        {blogData?.title}
                    </h1>

                    {/* Meta info & Share buttons row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-6">
                        {/* Localized Date */}
                        <p className="text-[#10710F] text-[12px] font-sans font-semibold tracking-widest uppercase">
                            {blogData?.created_at ? new Date(blogData.created_at).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            }) : ''}
                        </p>

                        {/* Share Options */}
                        <div className="flex items-center gap-3">
                            <span className="text-[12px] font-semibold uppercase tracking-wider text-gray-500">Share:</span>
                            
                            {/* Facebook */}
                            <a 
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-[#1877F2] transition-colors"
                                title="Share on Facebook"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>

                            {/* X (formerly Twitter) */}
                            <a 
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-black transition-colors"
                                title="Share on X"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>

                            {/* LinkedIn */}
                            <a 
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-[#0A66C2] transition-colors"
                                title="Share on LinkedIn"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Blog Content */}
                    <div>
                        <div
                            className="text-[#10710F] text-xl leading-relaxed font-normal font-sans opacity-90 transition-opacity duration-300 group-hover:opacity-100 break-words whitespace-normal"
                            dangerouslySetInnerHTML={{ __html: blogData?.content }}
                        />
                    </div>
                </div>
            </MaxWidth>
        </div>
    )
}

export default BlogDetailsPage;