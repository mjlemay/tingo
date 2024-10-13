import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import {
    GearIcon,
    Pencil1Icon,
    EnterIcon,
    ExitIcon,
  } from '@radix-ui/react-icons';
import MoreMenuButton from './moreMenuButton';

type nodeObjectData = {
    icon?: string;
    label: string;
    type?: string;
}

interface FGNodeProps {
    children?: React.ReactNode;
    data: nodeObjectData;
    isConnectable: boolean;
}

function FGNode(props:FGNodeProps):JSX.Element {
    const { children, data, isConnectable } = props;
    const { icon = 'enter', label = '', type = '' } = data;

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

    const iconForNode = (iconName: string) => {
        let icon = <EnterIcon />;
        switch (iconName) {
            case 'enter':
                icon = <EnterIcon />
                break;
            case 'exit':
                icon = <ExitIcon />
                break; 
            default:
                break;
        }
        return icon;
    }

    return (
        <div className='rounded-lg bg-neutral-700 text-white p-2 m-1 w-[200px] h-[60px] drop-shadow-lg'>
            {children}
            <div className="flex">
                <div className=" w-12 h-12 flex justify-center items-center bg-neutral-800">
                    {iconForNode(icon)}
                </div>
                <div className="ml-2">
                    <div className="text-lg font-bold">{label}</div>
                    <div className="text-gray-500">{type}</div>
                </div>
                <div className='ml-2 max-w-[24px]'>
                    <MoreMenuButton menuItems={nodeMenuItems} />
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Left}
                id="b"
                isConnectable={isConnectable}
            />
        </div>
    )
}

export default memo(FGNode);