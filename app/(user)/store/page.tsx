'use client'
import React from "react";
import Image, { StaticImageData } from "next/image";
import logo from "@/public/appIcons/fragz-logo.png";
import caution from "@/public/images/caution.png";

interface ItemProps {
  name: string;
  desc: string;
  price: string;
  imgs: string[];
}

const text =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur sint quisquam, ad nihil animi iusto obcaecati optio sit dolorem repudiandae, voluptas illo aliquid eveniet impedit ullam. Tempore in eaque optio.";

export default function StorePage() {
  const [toggle, setToggle] = React.useState(false);
  // Item vars
  const [itemName, setItemName] = React.useState("");
  const [itemDesc, setItemDesc] = React.useState("");
  const [itemPrice, setItemPrice] = React.useState("");
  const [itemImgs, setItemImgs] = React.useState("");

  function handleClick(name: string, desc: string, price: string) {
    setToggle(true);
    setItemName(name);
    setItemDesc(desc);
    setItemPrice(price);
  }

  const Item = () => {
    return (
      <div
        onClick={(e) => {
          handleClick("Dummy", text, "Free 99");
        }}
        className="h-40 w-40 md:h-60 md:w-60 flex flex-col items-center justify-evenly text-white font-windows"
      >
        <div className="h-28 w-28 md:h-40 md:w-40 flex justify-center">
          <Image className="object-cover" src={caution} alt="dummy" />
        </div>
        <h1 className="md:text-xl">Dummy</h1>
      </div>
    );
  };
  return (
    <main className="h-full flex flex-col items-center justify-center">
      {/* Main container */}
      <div className="h-full w-full flex flex-row items-center justify-center bg-black border-2 border-white p-5 relative">
        {/* Shop dialogue */}
        <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-evenly p-5">
          {/* Header */}
          <h1 className="tracking-widest text-white font-windows text-3xl md:text-4xl md:p-2 w-full border-2 border-white text-center">
            SHOP
          </h1>
          {/* Items */}
          <div className="w-full h-5/6 flex flex-row flex-wrap items-start justify-center border-2 border-white overflow-y-scroll no-scrollbar">
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </div>
        </div>

        {/* Probably should turn this into a component or something later */}
        {/* Item dialogue */}
        <div
          className={`${
            toggle
              ? "scale-100 opacity-100"
              : "scale-0 lg:scale-100 lg:opacity-0"
          } absolute lg:static h-full w-full lg:w-1/2 p-5 bg-black text-white transition-all ease-in duration-75`}
        >
          <div className="w-full h-full flex flex-col items-center justify-evenly bg-black overflow-y-scroll no-scrollbar">
            {/* Close button */}
            <span
              onClick={(e) => {
                setToggle(false);
              }}
              className="absolute z-20 h-8 w-8 -top-0 -right-0 text-center cursor-pointer lg:hidden"
            >
              X
            </span>

            {/* Header */}
            <h1 className="tracking-widest text-white font-windows text-3xl md:text-4xl md:p-2 w-full border-2 border-white text-center">
              {itemName}
            </h1>

            {/* Content block */}
            <div className="w-full h-5/6 flex flex-col items-center border-2 border-white p-5 overflow-y-scroll no-scrollbar font-windows">
              {/* Img block */}
              <div className="flex flex-col items-center justify-evenly">
                {/* Main img */}
                <div className="w-full h-[250px] md:w-4/6 md:h-[350px] border-2 border-white flex justify-center my-2">
                  <Image className="object-cover" src={caution} alt="dummy" />
                </div>
                {/* Sub imgs - hard coded for now */}
                <div className="flex flex-row flex-wrap h-fit w-full md:w-4/6  my-2">
                  <div className="h-20 w-20 md:h-32 md:w-32 border-2 border-white">
                    <Image className="object-cover" src={caution} alt="dummy" />
                  </div>
                </div>
                {/* Price */}
                <h3 className="w-full md:text-xl  md:w-4/6  text-white/90">
                  {itemPrice}
                </h3>
              </div>

              {/* Desc */}
              <div className="md:w-4/6 md:text-lg flex text-justify my-2 text-white/90">
                {itemDesc}
              </div>

              {/* Button group */}
              <div className="flex flex-row w-full md:w-4/6  items-center justify-evenly mt-2">
                <button className="button">Add to Cart</button>
                <button className="button">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}