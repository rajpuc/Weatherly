import React from 'react';

interface LocationErrorProps {
  errorIcon?: React.ElementType;
  errorName: string;
  buttonIcon?: React.ElementType;
  error: string;
  buttonText:string;
  cb: () => void;
}

const AlertError: React.FC<LocationErrorProps> = ({
  errorIcon: ErrorIcon,
  errorName,
  buttonIcon: ButtonIcon,
  error,
  buttonText,
  cb,
}) => {
  return (
    <div className="px-6 sm:px-0">
      <div className="p-4 border-2 border-red-500 rounded-md container mx-auto">
        <h1 className="flex gap-2 items-center text-xl text-red-500 font-medium">
          {ErrorIcon && <ErrorIcon />}
          <span>{errorName}</span>
        </h1>
        <p className="text-red-500">{error}</p>
        <button
          onClick={cb}
          className="mt-3 border-2 px-3 gap-2 rounded-sm
                     bg-white text-gray-800 border-red-500
                     hover:bg-white hover:border-red-500
                     active:bg-white active:border-red-500 cursor-pointer
                     focus:outline-none focus:ring-red-500 focus:border-transparent
                     transition-colors duration-200 flex items-center py-1"
        >
          {ButtonIcon && <ButtonIcon size={20} />}
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default AlertError;
