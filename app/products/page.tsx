import { ProductList } from "@/components/productlist";
import { stripe } from "@/lib/stripe";

export default async function ProductsPage () {

const products = await stripe.products.list({
   expand: ["data.default_price"],
});

    return( 
    <div>
        <h1 className="text-center text-2xl font-semibold mb-4">All Products</h1>
        <ProductList products={products.data} />
    </div>)
}