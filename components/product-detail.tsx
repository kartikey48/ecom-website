"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const CartItem = items.find((item) => item.id === product.id);
  const quantity = CartItem ? CartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-xl border border-gray-100 text-center">
        {/* Product Image */}
        {product.images?.[0] && (
          <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-6">
            <Image
              src={product.images[0]}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        {/* Product Info */}
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        {product.description && (
          <p className="mt-2 text-gray-600 text-base">{product.description}</p>
        )}
        {price?.unit_amount && (
          <p className="mt-4 text-2xl font-semibold text-indigo-600">
            ₹{(price.unit_amount / 100).toFixed(2)}
          </p>
        )}

        {/* Quantity Controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => removeItem(product.id)}
            className="w-10 h-10 text-xl font-bold"
          >
            –
          </Button>
          <div className="w-12 h-10 flex items-center justify-center rounded-md bg-gray-100 text-lg font-medium">
            {quantity}
          </div>
          <Button
            onClick={onAddItem}
            className="w-10 h-10 text-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
