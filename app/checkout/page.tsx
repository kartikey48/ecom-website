"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
  const { items, removeItem, addItem, clearCart } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (total === 0 || items.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-gray-600">
          Your Cart is Empty.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader className="border-b">
          <CardTitle className="text-xl font-semibold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 py-6">
          <ul className="space-y-6">
            {items.map((item, key) => (
              <li key={key} className="flex flex-col gap-3 border-b pb-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>{item.name}</span>
                  <span>
                    ₹{((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => removeItem(item.id)}
                    className="w-10 h-10 text-xl font-bold"
                  >
                    –
                  </Button>
                  <div className="w-14 h-10 flex items-center justify-center rounded-md bg-gray-100 text-lg font-medium">
                    {item.quantity}
                  </div>
                  <Button
                    onClick={() => addItem({ ...item, quantity: 1 })}
                    className="w-10 h-10 text-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-xl font-semibold">
            <span>Total:</span>
            <span>₹{(total / 100).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <form action={checkoutAction} className="mt-6 w-full max-w-md">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <div className="flex flex-col space-y-4">
          <Button className="w-full h-12 text-lg font-semibold bg-black text-white hover:bg-gray-900">
            Proceed to Payment
          </Button>

          <Button
            onClick={() => clearCart()}
            className="w-full h-12 text-lg font-semibold bg-black text-white hover:bg-gray-900"
          >
            Clear Cart
          </Button>
        </div>
      </form>
    </div>
  );
}
