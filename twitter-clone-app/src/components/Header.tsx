import React from 'react'
import { useHistory } from 'react-router';
import { Children } from './Layout'


 const Header = ({children}:Children) => {
  const history = useHistory();

    return (
        <div
        style={{ background: "#78A1D1" }}
        className="d-flex align-items-center text-white w-100 p-2  left-0 top-0"
      >
        <button onClick={()=>history.goBack()} className="btn text-white ">
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <div className="d-flex flex-column ml-4 align-items-center justify-content-center">
          <strong style={{ fontSize: 20 }}>{children}</strong>
        </div>
      </div>
    )
}
export default Header