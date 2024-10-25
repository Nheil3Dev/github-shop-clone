import { useState } from "react";

export const AccountAside = () => {
  //TODO: Modificar esto para hacerlo dinámico cuando añada más pages
  const [isSelected, setIsSelected] = useState(true);
  return (
    <aside className="bg-gray-300 text-gray-700 w-64 text-sm self-start">
      <ul className="my-4">
        <li
          className={` py-1 hover:bg-gray-400 hover:text-blue-500 cursor-pointer ${
            isSelected ? "border-l-4 border-l-gray-700 font-bold pl-3" : "pl-4"
          }`}
        >
          My account
        </li>
        <li className="pl-4 py-1 hover:bg-gray-400 hover:text-blue-500 cursor-pointer">
          My orders
        </li>
        <li className="border-b border-b-gray-400 mx-3 my-4"></li>
        <li className="pl-4 py-1 hover:bg-gray-400 hover:text-blue-500 cursor-pointer">
          Addres book
        </li>
        <li className="pl-4 py-1 hover:bg-gray-400 hover:text-blue-500 cursor-pointer">
          Account information
        </li>
        <li className="pl-4 py-1 hover:bg-gray-400 hover:text-blue-500 cursor-pointer">
          Stored payment methods
        </li>
        <li className="border-b border-b-gray-400 mx-3 mt-4 mb-6"></li>
      </ul>
    </aside>
  );
};
