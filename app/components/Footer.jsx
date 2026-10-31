import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='flex justify-between items-centerw-full bg-purple-600 dark:bg-black text-white p-6 text-center px-15  text-sm'>
            <Link href={'/'} className='font-semibold uppercase underline'>Movie Master</Link>
            <div>
                Created by{` `}
                <a className='font-semibold underline lowercase' href="https://github.com/rajanijha50" target="_blank" rel="noopener noreferrer">
                rajanijha50
                </a>
            </div>
        </div>
    )
}

export default Footer
