import React, { useEffect, useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { 
    CodeIcon,
    EnterIcon,
    Pencil1Icon,
    EraserIcon,
    ExitIcon
} from '@radix-ui/react-icons'
import RuleIcon from '../svg/ruleIcon';
import Block from './block';
import ColumnLayout from './columnLayout';
import FlowGraph from './flowGraph';
import ToolbarMenu from './toolbarMenu';
import { basicRuleType } from '../constants/defaults';
import { string } from 'zod';
import MoreMenuButton from './moreMenuButton';


interface PlayBookViewProps {
    children?: React.ReactNode;
    ruleItem: basicRuleType;
  }

export default function PlayBookView(props:PlayBookViewProps):JSX.Element {
const { children, ruleItem = {jsonBody: '', ruleId: -1, name: ''} } = props;
const { jsonBody, ruleId , name} = ruleItem;
const [command, setCommand] = useState('');
const [commandCount, setCommandCount] = useState(0);

const actionHandler = (action:string, value:string) => { console.log(action,value)};

    const toolbarMenuItems = [
        {
            icon: <EnterIcon />,
            value: 'input',
        },
        {
            icon: <CodeIcon />,
            value: 'action',
        },
        {
            icon: <ExitIcon />,
            value: 'output',
        }
    ];

    const ProjectMenuItems = [
        {
        label: 'Rename',
        icon: <Pencil1Icon />,
        clickHandler: () => actionHandler('openModal', 'editRule')
        },
        {
        label: 'Delete',
        icon: <EraserIcon />,
        clickHandler: () => actionHandler('openModal', 'deleteRule'),
        }
    ]

    const parseJsonBody = (key:string) => {
        const json = jsonBody && JSON.parse(jsonBody) || {};
        return json[key as keyof typeof string ] || [];
    }

    const menuHandler = (menuAction:string) => {
        const latestCommandCount = commandCount + 1;
        const latestCommand =  `${menuAction}_${latestCommandCount}`;
        setCommand(latestCommand)
        setCommandCount(latestCommandCount);
    }

    useEffect(()=> {
        ruleId !== -1 && setCommand(`setFlow_${ruleId}`);
    }, [ruleId]);

    return (
        <>
            <ColumnLayout>
                <Block title={name} size="lg" noMargin={true} stretch={true} icon={<RuleIcon />} menu={<MoreMenuButton menuItems={ProjectMenuItems} />}>
                    <div
                        className="m-0 p-0 overflow-auto h-full flex-start relative"
                    >
                        <ReactFlowProvider>
                            <FlowGraph latestCommand={command} initialNodes={parseJsonBody('nodes')} initialEdges={parseJsonBody('edges')} />
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
