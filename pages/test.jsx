import React from "react";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PreviewPage() {
    React.useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            console.log(
                "Order placed! You will receive an email confirmation."
            );
        }

        if (query.get("canceled")) {
            console.log(
                "Order canceled -- continue to shop around and checkout when you’re ready."
            );
        }
    }, []);

    return (
        <>
            <form action="/api/checkout_sessions" method="POST">
                <section>
                    <p>Free plan</p>
                    <input
                        type="hidden"
                        name="priceId"
                        value="price_1M8S0eKOSjUqV7QUY93njAe8"
                    />
                    <input type="hidden" name="quantity" value="1" />
                    <button type="submit" role="link">
                        Checkout
                    </button>
                </section>
            </form>
            <form action="/api/checkout_sessions" method="POST">
                <p>Premium plan</p>
                <input
                    type="hidden"
                    name="priceId"
                    value="price_1M8S1jKOSjUqV7QUEYjo04P7"
                />
                <input type="hidden" name="quantity" value="1" />
                <section>
                    <button type="submit" role="link">
                        Checkout
                    </button>
                </section>
            </form>
        </>
    );
}
