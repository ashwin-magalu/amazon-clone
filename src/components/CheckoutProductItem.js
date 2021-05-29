import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";

const CheckoutProductItem = ({
  item,
  removeFromBasketFunc,
  addItemToBasket,
}) => {
  const { id, title, price, description, category, image, hasPrime, rating } =
    item;

  return (
    <div className="flex flex-wrap my-5">
      <Image
        src={image}
        alt={title}
        height={200}
        width={200}
        objectFit="contain"
        className="col-span-1 z-20"
      />
      <div className="mx-5">
        <h3 className="max-w-2xl">{title}</h3>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3 max-w-2xl">{description}</p>
        <Currency quantity={price} currency="INR" />
        {hasPrime && (
          <div className="flex items-center space-x-2 -mt-15">
            <img
              loading="lazy"
              src="https://links.papareact.com/fdw"
              alt="prime"
              className="w-12"
            />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 mx-auto justify-self-end">
        <button className="button" onClick={() => addItemToBasket(item)}>
          Add to Basket
        </button>
        <button
          className="button"
          onClick={() => removeFromBasketFunc(item.id)}
        >
          Remove From Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProductItem;
