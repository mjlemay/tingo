import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import {
    CodeIcon,
    GearIcon,
    Pencil1Icon,
    EnterIcon,
    ExitIcon,
  } from '@radix-ui/react-icons';
import MoreMenuButton from './moreMenuButton';

type formatObject = {
    icon?: React.ReactNode;
    color?: string;
}

type nodeObjectData = {
    label: string;
    format: string;
}

interface FGNodeProps {
    children?: React.ReactNode;
    data: nodeObjectData;
    isConnectable: boolean;
}

function FGNode(props:FGNodeProps):JSX.Element {
    const { children, data, isConnectable } = props;
    const { label = '', format = 'input' } = data;

    const nodeMenuItems = [
        {
        label: 'Edit Project',
        icon: <Pencil1Icon />,
        clickHandler: () => {},
        },
        {
        label: 'Configure Settings',
        icon: <GearIcon />,
        clickHandler: () => {},
        }
    ];

    const nodeFormat = (format:string, attribute:string) => {
        const formats:Record<string,formatObject> = {
            'input': {
                'icon': <EnterIcon />,
                'color': 'bg-green-500',
            },
            'action': {
                'icon': <CodeIcon />,
                'color': 'bg-blue-500',
            },
            'output': {
                'icon': <ExitIcon />,
                'color': 'bg-teal-500',
            }
        }
        return formats[format as keyof formatObject][attribute as keyof formatObject];
    }


    return (
        <div className='rounded-lg bg-neutral-700 text-white p-2 m-1 w-[200px] h-[60px] drop-shadow-lg'>
            {children}
            <div className="flex">
                <div className={`w-12 h-12 flex justify-center items-center rounded *:min-w-[32px] *:min-h-[32px] ${nodeFormat(format, 'color')}`}>
                    {nodeFormat(format, 'icon')}
                </div>
                <div className="ml-2">
                    <div className="text-lg font-bold">{label}</div>
                    <div className="text-gray-500">{format}</div>
                </div>
                <div className='ml-2 max-w-[24px]'>
                    <MoreMenuButton menuItems={nodeMenuItems} />
                </div>
            </div>
            {format !== 'output' && (
            <Handle
                className="w-4 h-4 rounded-full bg-gray-500"
                type="source"
                position={Position.Right}
                id="a"
                isConnectable={isConnectable}
            />)}
            {format !== 'input' && (
            <Handle
                className="w-4 h-4 rounded-full bg-gray-500"
                type="target"
                position={Position.Left}
                id="b"
                isConnectable={isConnectable}
            />
            )}
        </div>
    )
}

export default memo(FGNode);