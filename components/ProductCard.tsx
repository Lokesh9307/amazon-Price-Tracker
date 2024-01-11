import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props{
    product:Product;
}

const ProductCard = ({product}:Props) => {
  return (
    <Link href={`/products/${product._id}`} className='product-card'>
        <div className='product-card_img-container'>
            <Image 
            src={product.image} 
            alt={product.title}
            width={200}
            height={200}
            />
        </div>
        <div className='flex flex-col gap-3'>
            <h3 className='product-title'>{product.title}</h3>
            <div className='text-black opacity-50 text-lg capitalize'>
                <p>{product.category}</p>

                <p className='flex gap-3'>
                    <span>{product?.currency}</span>
                    <span className='text-black'>{product?.originalPrice?product.originalPrice:product.highestPrice}</span>
                </p>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard