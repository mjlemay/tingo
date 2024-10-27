import React from 'react';
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import * as Toolbar from "@radix-ui/react-toolbar";
import Card from './card';
import Block from './block';
import {
    LaptopIcon,
    ExclamationTriangleIcon,
    OpenInNewWindowIcon,
    EnterFullScreenIcon,
} from '@radix-ui/react-icons';

interface DeviceCardProps {
    children?: React.ReactNode;
    name: string;
    type: string;
    deviceId: string;
    description?: string;
    actionHandler?: Function;
}
  
export default function DeviceCard(props:DeviceCardProps):JSX.Element {
  const { children, name, type, deviceId, description, actionHandler = () => {} } = props;
  const itemKey = `device_${deviceId}`;
  
  return (
    <div key={itemKey} className="min-w-[200px] min-h-full basis-1/3">
        <Card>
            <AspectRatio.Root ratio={4 / 3}>
                <div className='bg-gradient-to-b from-neutral-600 to-neutral-700 h-full rounded-lg [&>div]:w-full flex flex-col place-content-end'>
                    <div>
                        <Block title={name} icon={type  === 'output' ? <LaptopIcon /> : <ExclamationTriangleIcon />} >
                            <div>
                                <Toolbar.Root className="flex w-full min-w-max rounded-md bg-neutral-800 p-2.5 max-w-full drop-shadow-lg">
                                    <Toolbar.ToolbarLink className="ml-0.5 h-[25px] flex-shrink-0 flex-grow basis-auto items-center justify-center rounded bg-transparent px-[5px] text-[13px] leading-none outline-none inline-flex max-lg:hidden">
                                        {description}
                                    </Toolbar.ToolbarLink>
                                    <Toolbar.Separator className="mx-2.5 w-px bg-white max-lg:hidden" />
                                    <Toolbar.Button onClick={()=> {actionHandler('openNewWindow', '', {title: name})}} className="bg-neutral-400 hover:bg-indigo-300 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded px-[5px] text-[13px] leading-none outline-none first:ml-0 data-[state=on]:bg-red-500 data-[state=on]:text-green-500 [&>*]:w-[20px] [&>*]:h-[20px]"><OpenInNewWindowIcon /></Toolbar.Button>
                                    <Toolbar.Button onClick={()=> {actionHandler('openFullScreen')}} className="bg-neutral-400 hover:bg-indigo-300 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded px-[5px] text-[13px] leading-none outline-none first:ml-0 data-[state=on]:bg-red-500 data-[state=on]:text-green-500 [&>*]:w-[20px] [&>*]:h-[20px]"><EnterFullScreenIcon /></Toolbar.Button>
                                </Toolbar.Root>
                            </div>
                            {children}
                        </Block>
                    </div>
                </div>
            </AspectRatio.Root>
        </Card>
    </div>
  )
}