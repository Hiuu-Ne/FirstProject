import React from 'react';

interface BookCoverProps {
  onOpen: () => void;
}

const BookCover: React.FC<BookCoverProps> = ({ onOpen }) => {
  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-gradient-to-br from-purple-800 to-indigo-900 rounded-md"
      onClick={onOpen}
    >
      <div className="border-4 border-yellow-400/50 p-4 rounded-lg w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-4">디지털 앤서북</h1>
        <div className="w-1/3 h-1 bg-yellow-400/50 rounded-full my-4"></div>
        <p className="text-lg text-gray-200 mt-4">
          마음속으로 질문을 떠올린 후<br/>책을 펼쳐보세요.
        </p>
        <div className="mt-auto text-yellow-400/70 text-sm">
          - Click to open -
        </div>
      </div>
    </div>
  );
};

export default BookCover;
