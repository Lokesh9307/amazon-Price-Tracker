import HeroCorusel from "@/components/HeroCorusel"
import Searchbar from "@/components/Searchbar"
import Image from "next/image"
import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"


const Home = async ()=> {
  const allProducts  = await getAllProducts();
  return (
    <>
    <section className="p-6 md:px-20 py-24 border-2 border-[#2ADA9A] ">
      <div className="flex max-xl:flex-col gap-16">
        <div className="flex flex-col justify-center">
          <p className="small-text flex items-center">
            Smart Shopping Starts Here: <span className="font-bold text-xl">→</span>
          </p>
          <h1 className="head-text">
            Unleash the Power of 
            <span className="text-primary"> PriceTracker</span>
          </h1>
          <p className="mt-6">
            Powerful, self-serve products and growth analytics to help you convert, engage, and retain more.
          </p>
          <Searchbar/>
        </div>
        <HeroCorusel/>
      </div>
    </section>
    <section className="trending-section">
      <h2 className="section-text">Trending</h2>
      <div className="flex flex-wrap gap-x-8 gap-y-16">
        {
         allProducts?.map((product)=>(
            <ProductCard key={product._id} product={product}/>
          ))
        }
      </div>
    </section>
    </>
  )
}

export default Home