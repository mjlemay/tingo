import React, { useState } from 'react';

import { ReactFlowProvider } from '@xyflow/react';
import { 
    CodeIcon,
    EnterIcon,
    ExitIcon
} from '@radix-ui/react-icons'
import RuleIcon from '../svg/ruleIcon';
import Block from './block';
import ColumnLayout from './columnLayout';
import FlowGraph from './flowGraph';
import ToolbarMenu from './toolbarMenu';


interface PlayBookViewProps {
    children?: React.ReactNode;
  }

export default function PlayBookView(props:PlayBookViewProps):JSX.Element {
const { children } = props;
const [command, setCommand] = useState('');
const [commandCount, setCommandCount] = useState(0);

    const toolbarMenuItems = [
        {
            icon: <EnterIcon />,
            value: 'input',
        },
        {
            icon: <CodeIcon />,
            value: 'function',
        },
        {
            icon: <ExitIcon />,
            value: 'output',
        }
    ];

    const menuHandler = (menuAction:string) => {
        const latestCommandCount = commandCount + 1;
        const latestCommand =  `${menuAction}_${latestCommandCount}`;
        setCommand(latestCommand)
        setCommandCount(latestCommandCount);
    }

    return (
        <>
            <ColumnLayout>
                <Block title="Core Rules" size="lg" noMargin={true} stretch={true} icon={<RuleIcon />}>
                    <div
                        className="m-0 p-0 overflow-auto h-full flex-start relative"
                    >
                        <ReactFlowProvider>
                            <FlowGraph latestCommand={command} />
                        </ReactFlowProvider>
                        <ToolbarMenu
                            label='Rules Menu'
                            menuHandler={menuHandler}
                            toolbarMenuItems={toolbarMenuItems}
                        />
                    </div>
                </Block>
            </ColumnLayout>
            {children}
        </>
    )
}
