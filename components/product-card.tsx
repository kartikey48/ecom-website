import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="relative overflow-hidden rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105">
        {product.images?.[0] && (
          <div className="relative w-full h-72">
            <Image
              alt={product.name}
              src={product.images[0]}
              layout="fill"
              objectFit="cover"
              className="hover:opacity-90 transition-opacity duration-300"
            />
          </div>
        )}

        <CardHeader className="p-4">
          <CardTitle className="text-xl font-semibold text-gray-800">
            {product.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 flex flex-col gap-3">
          {product.description && (
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          )}

          {price?.unit_amount && (
            <p className="text-center text-xl text-gray-800 font-medium">
              ₹{(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
          <Button className="w-full mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};