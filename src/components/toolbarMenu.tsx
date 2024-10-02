import React, { ReactElement } from 'react';
import * as Toolbar from '@radix-ui/react-toolbar';

type toolbarMenuItem = {
    icon?: ReactElement;
    label?: string;
    value: string;
    group?: string;
}

interface ToolbarMenuProps {
    label?: string;
    children?: React.ReactNode;
    toolbarMenuItems: toolbarMenuItem[]
}
  
export default function ToolbarMenu(props:ToolbarMenuProps):JSX.Element {
  const { label = '', children, toolbarMenuItems = [] } = props;
  
  return (
    <Toolbar.Root
        className='rounded-lg flex bg-neutral-800 p-2 m-2 min-h-[64px] drop-shadow-lg absolute top-[32px] left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        aria-label={label}
    > 
        {toolbarMenuItems.map((menuItem, index) => {
            const { icon, label, value } = menuItem;
            return (
                <Toolbar.Button 
                    key={`button_${label}_${index}`}
                    value={value} 
                    className='rounded-lg min-w-[40px] min-h-[40px] p-2  *:min-w-[40px] *:min-h-[40px] hover:bg-neutral-700'>
                    {icon}{icon && label && ' '}{label}
                </Toolbar.Button>
            )
        })}
        {children}
    </Toolbar.Root>
  )
}