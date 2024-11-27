import React, { useEffect, useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { 
    CodeIcon,
    EnterIcon,
    Pencil1Icon,
    ExitIcon
} from '@radix-ui/react-icons'
import RuleIcon from '../svg/ruleIcon';
import Block from './block';
import Card from './card';
import ColumnLayout from './columnLayout';
import FlowGraph from './flowGraph';
import ToolbarMenu from './toolbarMenu';
import { basicRuleType } from '../constants/defaults';
import { string } from 'zod';
import MoreMenuButton from './moreMenuButton';


interface ArtBoardViewProps {
    children?: React.ReactNode;
    artItem: basicRuleType;
    actionHandler?: Function;
  }

const tempJSONBody = 
'{"nodes":[],"edges":[]}';

export default function ArtBoardView(props:ArtBoardViewProps):JSX.Element {
    const { actionHandler, children, artItem = {jsonBody: tempJSONBody, ruleId: -1, name: '', description: ''} } = props;
    const { jsonBody, ruleId , name, description } = artItem;
    const [command, setCommand] = useState('');
    const [lastFlow, setLastFlow] = useState('');
    const [commandCount, setCommandCount] = useState(0);

    const moreMenuHandler = (action:string, value:string, payload:number) => { 
        actionHandler && actionHandler(action, value, payload);
    };

    const flowUpdateHandler = (payload:basicRuleType) => {
        const playloadStr = JSON.stringify(payload);
        if (playloadStr !== lastFlow) {
            actionHandler && actionHandler('update', 'rule', payload);
            setLastFlow(playloadStr);
        }
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
                    <div className="flex items-stretch flex-row min-h-full">
                        <div className="grow">
                            <div
                                className="m-0 p-0 min-h-full overflow-auto h-full grow relative"
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
                                    label='Component Menu'
                                    menuHandler={menuHandler}
                                    toolbarMenuItems={toolbarMenuItems}
                                />
                            </div>
                        </div>
                        <div data-name="sidebar" className="min-w-[250px] min-h-full">
                            <Card>
                                <p>Wake me up plz</p>
                            </Card>
                        </div>
                    </div>
                </Block>
            </ColumnLayout>
            {children}
        </>
    )
}