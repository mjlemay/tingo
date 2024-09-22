import React from 'react';

interface MenuItemProps {
    children?: React.ReactNode;
    label?: string;
    type?: "submit" | "reset" | "button";
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    handleAction?: Function;
}
  
  export default function Button(props:MenuItemProps):JSX.Element {
    const { handleAction, children, label, prefix, suffix, type } = props;

    return (
      <button className={`flex flex-row ${prefix ? '' :  'pl-2 pr-1'} ${suffix ? '' :  'pr-2 pl-1'} hover:bg-indigo-300 items-center justify-center rounded-lg cursor-pointer bg-neutral-400`}
      type={type}
      onClick={() => handleAction && handleAction()}
      >
        {(prefix && 
            <div 
                className='flex grow-0 pr-1 justify-center min-w-[24px] max-w-[24px] w-[24px] min-h-[24px] max-h-[24px] h-[24px]'>
                {prefix}
            </div>
        )}
        <div className='flex items-center justify-center h-10 truncate ...'>
            <span className='inline-block text-xl leading-loose truncate ...'>{label || children}</span>
        </div>
        {(suffix && <div 
            className='flex grow-0 justify-center pl-1 min-w-[24px] max-w-[24px] w-[24px] min-h-[24px] max-h-[24px] h-[24px]'>
                {suffix}
            </div>
        )}
      </button>
    )
  }