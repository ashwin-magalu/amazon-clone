import { getSession } from "next-auth/client";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

const Home = ({ products, session }) => {
  return (
    <div className="bg-gray-100 relative">
      <Head>
        <title>Amazon-Next</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto z-90">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  /* This tells nextJS, that this page is not static */
  const products = await fetch("http://fakestoreapi.com/products").then(
    (response) => response.json()
  );
  return {
    props: {
      products,
      session,
    },
  };
};
