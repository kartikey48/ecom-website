"use client";

import { useEffect, useState } from "react";
import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";

interface Props {
    products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [products.length]);

    const currentProduct = products[current];
    const price = currentProduct.default_price as Stripe.Price;

    return (
        <Card className="relative overflow-hidden rounded-lg shadow-lg border border-gray-300">
            {currentProduct.images && currentProduct.images[0] && (
                <div className="relative h-72 w-full">
                    <Image
                        alt={currentProduct.name}
                        src={currentProduct.images[0]}
                        layout="fill"
                        objectFit="cover"
                        className="transition-opacity duration-500 ease-in-out group-hover:opacity-75"
                    />
                </div>
            )}
            <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4 transition-all duration-300">
                <CardTitle className="text-3xl font-bold text-blue-400 text-center mb-2 hover:underline">{currentProduct.name}</CardTitle>
                {price && price.unit_amount && (
                    <p className="text-lg text-white font-medium">
                        ₹{(price.unit_amount / 100).toFixed(2)}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};