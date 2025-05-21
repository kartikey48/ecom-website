import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 flex flex-col-reverse md:flex-row items-center gap-12 bg-white rounded-xl shadow-md">
        {/* Text Block */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Welcome to <span className="text-blue-600">My Ecommerce </span>
          </h1>
          <p className="text-lg text-gray-600">
            Discover awesome anime t-shirts and more in this fully built ecommerce experience.
          </p>
          <Button asChild className="mt-4 px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            <Link href="/products">Browse All Products</Link>
          </Button>
        </div>

        {/* Image Block */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96">
            <Image
              alt="Hero Product"
              src={products.data[0]?.images[0] || "/default-image.jpg"}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Featured Products</h2>
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
