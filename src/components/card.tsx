import React from 'react';

interface CardProps {
    children?: React.ReactNode;
  }
  
  export default function Card(props:CardProps):JSX.Element {
    const { children } = props;
  
    return (
      <div className='rounded-lg bg-neutral-800 p-2 m-2 drop-shadow-lg'>
        {children}
      </div>
    )
  }