import React from 'react'
import fileIcon from '@/public/appIcons/wikiicon.png'
import Image from 'next/image'
import { FileProps } from '@/types'
import Link from 'next/link'


const WikiFile = ({ title, created_at, authors }: FileProps) => (
    <Link 
        href={`/wiki/${title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`}
        className="w-full h-[50px] flex flex-row items-center justify-start bg-[#C5C5C5] border-2 border-b-black border-r-black hover:scale-105">
        {/* img */}
        <div className="w-[50px] h-[50px] flex items-center justify-center">
            <Image src={fileIcon} alt="fileIcon" width={100} height={100} />
        </div>
        <div className="w-full h-full flex flex-row items-center justify-start font-windows">
            {/* Title */}
            <h1 className="mx-auto font-bold">{title}</h1>
            {/* Authors */}
            <h1 className="mx-auto">{authors}</h1>
        </div>
    </Link>
)

const FileSystem = (articles: any) => {

    return (
        <span className="properties-window">
            {/* Tab gradient */}
            <div className="tab-gradient">
                <h1 className="">C:\FRAG-Z\WIKI\PAGES</h1>
                <div className="flex flex-row gap-2">
                    <span className="tab-gradient-button">?</span>
                    <span className="tab-gradient-button">X</span>
                </div>
            </div>
            {/* Filesystem window */}
            <section className="flex flex-col w-full h-full pt-4">
                {/* Explorer*/}
                <div className="w-full h-full flex flex-col p-5 items-start justify-start border-2 border-t-black border-l-black bg-white">
                    {articles.articles.map((article: any) =>
                        <WikiFile key={article.id} {...article} />
                    )}
                </div>
            </section>
        </span>
    )
}

export default FileSystem