import React from 'react';
import { FileIcon } from '@radix-ui/react-icons';

interface MenuItemProps {
    children?: React.ReactNode;
    disabled?: boolean;
    handleAction?: Function;
    iconBGColor?: string;
    label: string;
    prefix?: React.ReactNode;
    selected?: boolean;
    suffix?: React.ReactNode;
  }
  
  export default function MenuItem(props:MenuItemProps):JSX.Element {
    const { children, disabled, handleAction, label, prefix, selected = false, suffix } = props;
  
    return (
      <div
      data-selected={selected}
      data-disabled={disabled}
        className={`flex select-none flex-row gap-2 data-[selected=true]:bg-slate-500 ${!disabled && 'hover:bg-slate-700 cursor-pointer'} max-h-[24px] min-h-[24px] pl-2 data-[disabled=true]:text-neutral-500`}
        onClick={() => handleAction && !disabled && handleAction()}
      >
        <div 
            className="min-h-[24px] flex items-center text-neutral-500 justify-center">
            {(prefix ? prefix : <FileIcon />)}
        </div>
        <div className='flex max-h-[24px] min-h-[24px] items-center grow truncate ...'>
            <span className='inline-block text-sm leading-loose truncate ...'>{label}</span>
        </div>
        {(suffix && <div 
            className='flex flex-row gap-2 hover:bg-slate-700 cursor-pointer max-h-[24px] min-h-[24px] pl-2'>
                {suffix}
            </div>
        )}
        {children}
      </div>
    )
  }