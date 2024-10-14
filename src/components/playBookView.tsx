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
    actionHandler?: Function;
  }

export default function PlayBookView(props:PlayBookViewProps):JSX.Element {
    const { actionHandler, children, ruleItem = {jsonBody: '', ruleId: -1, name: '', description: ''} } = props;
    const { jsonBody, ruleId , name, description } = ruleItem;
    const [command, setCommand] = useState('');
    const [commandCount, setCommandCount] = useState(0);

    const moreMenuHandler = (action:string, value:string, payload:number) => { 
        actionHandler && actionHandler(action, value, payload);
    };

    const flowUpdateHandler = (payload:basicRuleType) => { 
        actionHandler && actionHandler('update', 'rule', payload);
    };

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
        clickHandler: () => moreMenuHandler('openModal', 'editRule', ruleId)
        },
        {
        label: 'Delete',
        icon: <EraserIcon />,
        clickHandler: () => moreMenuHandler('delete', 'rule', ruleId),
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
                <Block
                    title={name}
                    description={description}
                    size="lg" 
                    noMargin={true}
                    stretch={true}
                    icon={<RuleIcon />}
                    menu={<MoreMenuButton menuItems={ProjectMenuItems} />}
                    >
                    <div
                        className="m-0 p-0 overflow-auto h-full flex-start relative"
                    >
                        <ReactFlowProvider>
                            <FlowGraph
                                latestCommand={command}
                                initialNodes={parseJsonBody('nodes')}
                                initialEdges={parseJsonBody('edges')}
                                handleChange={flowUpdateHandler}
                            />
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
