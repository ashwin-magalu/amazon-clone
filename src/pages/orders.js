import moment from "moment";
import { getSession } from "next-auth/client";
import Head from "next/head";
import db from "../../firebase";
import Header from "../components/Header";
import Order from "../components/Order";

const Orders = ({ orders, session }) => {
  return (
    <div>
      <Head>
        <title>Amazon-Next - Success</title>
      </Head>

      <Header />

      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b-2 mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {!session ? (
          <h2>Sign in to see your orders</h2>
        ) : (
          <h2>{orders.length} Orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders.map((order, i) => (
            <Order key={i} order={order} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export const getServerSideProps = async (context) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  /* Get the users logged in credentials */
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    return {
      props: {
        orders: [],
        session,
      },
    };
  }

  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
      session,
    },
  };
};
