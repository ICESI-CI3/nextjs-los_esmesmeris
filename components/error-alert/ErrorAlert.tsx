// components/SimpleAlert.jsx
"use client"
export default function SimpleAlert({ message }: { message: string }) {
  
  if (!message) {
    return null;
  }

  return (
    <div className="flex justify-center w-full my-4"> 
      <div 
        role="alert" 
        className="
          p-3 sm:px-4 
          text-sm text-red-800
          bg-red-100
          border border-red-400
          rounded-md
          text-center
          max-w-md w-full
        "
      >
        {message} 
      </div>
    </div>
  );
}