import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
} from '@radix-ui/react-icons';

type DropdownMenuItem = {
  icon?: React.ReactNode;
  label: string;
  clickHandler?: Function; 
}

type DropdownMenuButtonProps = {
  children?: React.ReactNode;
  iconBGColor?: string;
  menuItems?: DropdownMenuItem[];
}

export default function DropdownMenuButton(props:DropdownMenuButtonProps):JSX.Element {

  const { children, iconBGColor, menuItems = [] } = props;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="w-[40px] h-[40px] inline-flex p-0 background-transparent border-none items-center justify-center cursor-pointer rounded-lg border-2 border-solid border-gray-800 outline-none"
          aria-label="Customise options"
        >
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="max-w-[175px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left] :animate-slideRightAndFade"
          sideOffset={5}
        >
          {
            menuItems.map((menuItem, index) => {
              const { icon = <></>, label = '', clickHandler = ()=>{}} = menuItem
              return (
                <DropdownMenu.Item
                key={`dropdown_item_${index}_${label}`}
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[5px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-[#ef79ac33] cursor-pointer"
                onClick={()=> clickHandler()}
              >
                <div 
                  className={
                      `flex grow-0 items-center justify-center min-w-6 max-w-6 w-6 min-h-6 max-h-6 h-6 rounded-lg border-1 mr-2  border-solid border-gray-800 ${iconBGColor ?  iconBGColor : 'bg-stone-200'}`
                }>
                {icon}</div>
                <div className='flex w-80 h-10 items-center truncate ...'>
                    <span className='inline-block leading-loose truncate ...'>
                      {label}
                    </span>
                </div>
              </DropdownMenu.Item>
              )
            })
          }
          { children }
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
