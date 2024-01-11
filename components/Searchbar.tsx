'use client'
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

const Searchbar = () => {
    const [serachPrompt, setsearchprompt] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    const isValidAmazonProductURL = (url:string)=>{
        try{
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname;
            
            if(hostname.includes('amazon.com')|| hostname.includes('amazon')||hostname.endsWith('amazon')||hostname.includes('myntra.com') || hostname.includes('myntra')){
                return true;
            }
        }catch{
                return false;
        }
    }

    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const isValid = isValidAmazonProductURL(serachPrompt);

        if(!isValid){return alert('Please provide valid amazon link')}
        try {
            setIsLoading(true);
            // scrape the product page
            const product = await scrapeAndStoreProduct(serachPrompt);
            
        } catch (error) {
            throw new Error('Error Occured')
        }finally{
            
            setIsLoading(false);
        }
    }
    return (
        <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder='Enter Product Link'
                className='searchbar-input'
                value={serachPrompt}
                onChange={(e) => setsearchprompt(e.target.value)}
            />
            <button type="submit" className='searchbar-btn hover:text-primary' disabled={serachPrompt === ''}>{isLoading?'Loading...':'Search'}</button>
        </form>
    )
}

export default Searchbar