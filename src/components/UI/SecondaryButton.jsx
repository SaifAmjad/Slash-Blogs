import Spinner from "./Spinner";

const SecondaryButton = (
    {
  children,
  classname,
  onclick,
  loader = false,
  type = "button",
  ...restProps
}
) => {
  return (
       <button
        {...restProps}
        type={type}
        onClick={onclick}
        className={`bg-pink-600 cursor-pointer text-white text-sm font-bold px-4 py-2 rounded-[0.6rem] flex items-center align-middle hover:bg-pink-700 ${classname}`}
      >
        {loader ? (
          <>
            <Spinner />
          </>
        ) : (
          children
        )}
      </button>
  )
}

export default SecondaryButton