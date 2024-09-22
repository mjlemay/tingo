import React, { Children } from 'react';

interface ColumnLayoutProps {
    children?: React.ReactNode;
  }
  
  export default function ColumnLayout(props:ColumnLayoutProps):JSX.Element {
    const { children } = props;

    const mappedChildren = Children.map(children, child =>
      <div className="flex grow min-w-full w-full">
        {child}
      </div>
    );

    return (
      <div className="flex flex-col justify-top flex-nowrap h-full flex-start">
        {mappedChildren}
      </div>
    )
  }