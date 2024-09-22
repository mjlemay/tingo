import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  DotsVerticalIcon,
} from '@radix-ui/react-icons';

type MoreMenuItem = {
  hotkey?: string;
  label: string;
  clickHandler?: Function; 
}

type MoreMenuButtonProps = {
  children?: React.ReactNode;
  menuItems?: MoreMenuItem[];
}

export default function MoreMenuButton(props:MoreMenuButtonProps):JSX.Element {

  const { children, menuItems = [] } = props;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="w-[40px] h-[40px] inline-flex items-center justify-center cursor-pointer outline-none"
          aria-label="More options"
        >
          <DotsVerticalIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className=" max-w-fit bg-neutral-600 text-white rounded-md drop-shadow-lg p-[5px] drop-shadow-lg will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        >
          {
            menuItems.map((menuItem, index) => {
              const { hotkey, label = '', clickHandler = ()=>{}} = menuItem;
              return (
                  <DropdownMenu.Item key={`menu_item_${index}`} className="group text-[13px] leading-none text-white rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none cursor-pointer data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:bg-slate-700 data-[highlighted]:text-white"
                  onSelect={() => clickHandler()}
                  >
                  {label}{' '}
                  <div className="ml-auto pl-[20px] min-w-[4px] text-neutral-400 group-data-[disabled]:opacity-50">
                  {hotkey}
                  </div>
                </DropdownMenu.Item>
              )
            })
          }
          { children }
          <DropdownMenu.Arrow className="fill-neutral-600" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
