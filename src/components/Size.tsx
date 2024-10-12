interface Props {
  size: string;
  stock: string | number;
  onClick: () => void;
}

export const Size = ({ size, stock, onClick }: Props) => {
  return (
    <div className="group">
      <input className="hidden peer" type="radio" name="size" id={size} />
      {Number(stock) > 0 ? (
        <label
          className="group peer-checked:cursor-default peer-checked:bg-transparent peer-checked:border-gray-600 dark:peer-checked:border-white 
        dark:peer-checked:text-white antialiased bg-gray-100 border h-14 w-14 flex items-center justify-center 
        text-gray-700 font-semibold text-sm border-transparent hover:border-white hover:bg-gray-900 
        hover:text-white rounded-full cursor-pointer hover:peer-checked:text-inherit"
          htmlFor={size}
          onClick={onClick}
        >
          {size}
        </label>
      ) : (
        <div className="antialiased bg-gray-300 dark:bg-gray-600 border h-14 w-14 flex items-center justify-center text-white dark:text-gray-900 font-semibold text-sm border-transparent rounded-full cursor-default">
          {size}
        </div>
      )}
    </div>
  );
};
