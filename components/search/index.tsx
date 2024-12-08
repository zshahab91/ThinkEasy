import React from 'react';

const SearchBox: React.FC<{ searchTerm: string, onSearch: (value: string) => void }> = ({ searchTerm, onSearch }) => {
  return (
    <div className="flex justify-center my-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute left-3 top-2.5 w-5 h-5 text-gray-500">
          <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default SearchBox;