import Head from "next/head";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import CheckoutProductItem from "../components/CheckoutProductItem";
import Header from "../components/Header";
import {
  addToBasket,
  removeFromBasket,
  selectItems,
  selectTotal,
} from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const [session] = useSession();
  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // call the backend to create a checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });

    //Redirect the user to the checkout (stripe)
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);

    /* Use stripe cli to create a webhook */
  };

  const removeFromBasketFunc = (id) => {
    dispatch(removeFromBasket({ id }));
  };

  const addItemToBasket = (item) => {
    dispatch(addToBasket(item));
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon-Next - Checkout</title>
      </Head>

      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto z-90">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
            alt="checkout banner"
            className="z-20"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length > 0
                ? `Your Shopping Basket`
                : `Your Basket is Empty`}
            </h1>

            {items.map((item, i) => (
              <CheckoutProductItem
                key={i}
                item={item}
                removeFromBasketFunc={removeFromBasketFunc}
                addItemToBasket={addItemToBasket}
              />
            ))}
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length}) :{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="INR" />
                </span>
              </h2>
              <button
                role="link"
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
                onClick={createCheckoutSession}
              >
                {session ? "Proceed to Checkout" : "Sign In to Checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
