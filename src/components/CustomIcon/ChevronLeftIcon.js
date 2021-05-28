import React from 'react';

const ChevronLeftIcon = ({color, size}) => {
  return (
    <svg
      width={size || "24"}
      height={size || "24"}
      viewBox="0 0 24 24"
      fill="none"
      style={{display: 'inline-block'}}
    >
      <path
        d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
        fill={color || 'currentColor'}
      />
    </svg>
  )
};

export default ChevronLeftIcon;