import { useEffect } from "react";

const PrimaryAlert = ({ variant = "success", msg, state, setState }) => {
  const getAlertVariant = (variant) => {
    if (variant === "error") {
      return {
        color: "red",
        icon: (
          <svg
            className="w-10 h-10 text-red-600 fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
          </svg>
        ),
      };
    }

    return {
      color: "green",
      icon: (
        <svg
          className="w-6 h-6 text-green-500 fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
        </svg>
      ),
    };
  };

  const alertVariant = getAlertVariant(variant);

  useEffect(() => {
    let timePid;
    if (state) {
      timePid = setTimeout(() => {
        setState(false);
      }, 3000);
    }

    return () => clearTimeout(timePid);
  }, [state]);

  return (
    <>
      {state && (
        <div className="fixed top-4 left-3 flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md">
          
          <div
            className={`flex items-center justify-center w-12 bg-${alertVariant.color}-500`}
          >
            {alertVariant.icon}

            
          </div>

          <div className="px-4 py-2 -mx-3">
            <div className="mx-3">
              <span className={`font-semibold text-${alertVariant.color}-500`}>
                {variant === "error" ? "Error" : "Success"}
              </span>
              <p className="text-sm text-gray-600">{msg}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrimaryAlert;
