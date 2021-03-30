import React from "react";

const Trend = () => {
  return (
    <div className="d-flex trend px-4 py-3 border-bottom border-grey align-items-start justify-content-between">
      <div style={{fontSize:14}}>
        <p className='p-0 m-0'>Kpop - Trending</p>
        <strong>#블랙핑크</strong>
        <p className='p-0 m-0'>127K Tweets</p>
      </div>
      <svg
        style={{ width: 20 }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>
    </div>
  );
};
export default Trend;
