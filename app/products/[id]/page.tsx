import Modal from '@/components/Modal';
import PriceInfoCard from '@/components/PriceInfoCard';
import ProductCard from '@/components/ProductCard';
import { getProductById, getSimilarProducts } from '@/lib/actions'
import { formatNumber } from '@/lib/utlis';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface Props {
    params: {
        id: string,
    }
}
const ProductDetail = async ({ params: { id } }: Props) => {

    const product: Product = await getProductById(id);

    if (!product) redirect('/');

    const similarProducts = await getSimilarProducts(id);

    return (
        <div className='product-container'>
            <div className='flex gap-28 xl:flex-row flex-col'>
                <div className='product-image'>
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={580}
                        height={400}
                        className='mx-auto'
                    />
                </div>
                <div className='flex-1 flex flex-col'>
                    <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
                        <div className='flex flex-col gap-3'>
                            <p className='text-[28px] text-secondary font-semibold'>
                                {product.title}
                            </p>
                        </div>
                        <Link href={product.url} target='blank' className='text-base text-black opacity-50'>Visit Product</Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='product-hearts'>
                            <Image src='/assets/icons/red-heart.svg' alt='heart' width={20} height={20} />
                            <p className='text-base font-semibold text-[#D46F77]'>
                                {product.reviewsCount ? product.reviewsCount : '100'}
                            </p>
                        </div>
                        <div className='p-2 bg-white-200 rounded-10'>
                            <Image src='/assets/icons/bookmark.svg' alt='bookmark' height={20} width={20} />
                        </div>
                        <div className='p-2 bg-white-200 rounded-10'>
                            <Image src='/assets/icons/share.svg' alt='bookmark' height={20} width={20} />
                        </div>
                    </div>
                    <div className='product-info mt-3'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[34px] text-secondary font-bold'>
                                {product.currency}{formatNumber(product.currentPrice && product.originalPrice && product.lowestPrice || product.highestPrice)}
                            </p>
                            <p className='text-[21px] text-secondary opacity-50 line-through'>{product.currency}{formatNumber(product.originalPrice) && formatNumber(product.highestPrice)}</p>
                        </div>

                        <div className='flex flex-col'>
                            <div className='flex gap-3'>
                                <div className='product-stars'>
                                    <Image
                                        src='/assets/icons/star.svg'
                                        alt='stars'
                                        width={16}
                                        height={16}
                                    />
                                    <p className='text-sm text-primary-orange font-semibold'>
                                        {product.stars || '25'}
                                    </p>
                                </div>
                                <div className='product-reviews'>
                                    <Image src='/assets/icons/comment.svg' alt='comment' width={16} height={16} />
                                    <p className='text-sm text-secondary font-semibold'>
                                        {product.reviewsCount || '100'} Reviews
                                    </p>
                                </div>
                            </div>
                            <div className='text-sm text-black opacity-50 mt-4' >
                                <p><span className='text-primary-green font-semibold bg-green-200 p-1 rounded-full'>93%</span>of buyers recommended this </p>
                            </div>
                        </div>
                        <div className='my-7 flex flex-col gap-5'>
                            <div className='flex gap-5 flex-wrap'>
                                <PriceInfoCard
                                    title="Current Price"
                                    iconSrc='/assets/icons/price-tag.svg'
                                    value={`${product.currency} ${formatNumber(product.currentPrice || product.originalPrice || product.lowestPrice || product.highestPrice)}`}
                                    borderColor='#b6dbff'
                                />
                                <PriceInfoCard
                                    title="Average Price"
                                    iconSrc='/assets/icons/chart.svg'
                                    value={`${product.currency} ${formatNumber(product.averagePrice)}`}
                                    borderColor='#b6dbff'
                                />
                                <PriceInfoCard
                                    title="Highest Price"
                                    iconSrc='/assets/icons/arrow-up.svg'
                                    value={`${product.currency} ${formatNumber(product.highestPrice)}`}
                                    borderColor='#b6dbff'
                                />
                                <PriceInfoCard
                                    title="Lowest Price"
                                    iconSrc='/assets/icons/arrow-down.svg'
                                    value={`${product.currency} ${formatNumber(product.lowestPrice || product.highestPrice)}`}
                                    borderColor='#b6dbff'
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <Modal productId={id}/>
            <div className='flex flex-col'>
                <div className='flex flex-col gap-5'>
                    <h3 className='text-2xl text-secondary font-semibold'>
                        Product description
                    </h3>

                    <div className='flex flex-col gap-4'>
                        {product?.description.split('\n \t')}
                    </div>
                </div>
                <button className='btn w-fit mx-auto items-center justify-center gap-3 min-w-[200px] flex mt-4'>
                    <Image src='/assets/icons/bag.svg' alt='check' width={22} height={22}/>
                    <Link href={product.url} target='blank' className='text-white'>Buy Now</Link>
                </button>
            </div>
            {
                similarProducts && similarProducts?.length > 0 &&(
                    <div className='py-14 flex flex-col gap-2 w-full'>
                        <p className='section-text'>Similar Products</p>
                        <div className='flex flex-wrap gap-10 mt-7 w-full'>
                            {
                                similarProducts.map((product)=>(
                                    <ProductCard key={product.id} product={product}/>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProductDetail