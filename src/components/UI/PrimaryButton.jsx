import Spinner from "./Spinner";

const PrimaryButton = ({
  children,
  classname,
  onclick,
  loader = false,
  type = "button",
  disabled,
  ...restProps
}) => {
  return (
    <>
      <button
        {...restProps}
        type={type}
        onClick={onclick}
        disabled={disabled}
        className={`bg-black text-white text-sm font-bold px-4 py-2 rounded-[0.6rem] flex items-center align-middle hover:bg-black/70 ${disabled?'bg-black/70 cursor-default':'cursor-pointer'} ${classname}`}
      >
        {loader ? (
          <>
            <Spinner />
          </>
        ) : (
          children
        )}
      </button>
    </>
  );
};

export default PrimaryButton;
