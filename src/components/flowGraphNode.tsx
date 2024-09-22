import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import Card from './card';

type nodeObjectData = {
    label: string;
}

interface FGNodeProps {
    children?: React.ReactNode;
    data: nodeObjectData;
    isConnectable: boolean;
}

function FGNode(props:FGNodeProps):JSX.Element {
    const { children, data, isConnectable } = props;

    return (
        <Card>
            {children}
            <p>{data.label}</p>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                isConnectable={isConnectable}
            />
        </Card>
    )
}

export default memo(FGNode);