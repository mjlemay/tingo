import React from 'react';
import { basicProjectType } from "../constants/defaults";
import MoreMenuButton from './moreMenuButton';
import {
  GearIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';

interface TabHeadersProps {
    actionHandler?: Function;
    children?: React.ReactNode;
    projectTabs?: basicProjectType[];
}
  
  export default function TabHeaders(props:TabHeadersProps):JSX.Element {
    const { actionHandler = ()=>{}, children, projectTabs } = props;


    const ProjectMenuItems = [
        {
        label: 'Edit Project',
        icon: <Pencil1Icon />,
        clickHandler: () => actionHandler('openModal', 'editProject'),
        },
        {
        label: 'Configure Settings',
        icon: <GearIcon />,
        clickHandler: () => actionHandler('openModal', 'configProject'),
        }
    ]
  
    return (
        <div data-id="header" 
          className="h-[40px] w-full flex-none border-b border-neutral-800 bg-gradient-to-b from-neutral-925 to-neutral-950"
        >
            { projectTabs && projectTabs.map((projectTab, index) => {
                const { projectId, name } = projectTab;
                return (
                    <div className="text-xl h-[40px] w-fit max-w-[250px] py-3 px-4 inline-flex items-center gap-x-2 bg-neutral-900  text-center border data-[selected=true]:border-b-0 border-neutral-800 text-white rounded-tr-xl data-[selected=true]:opacity-100 opacity-50 cursor-pointer leading-loose truncate ..." data-id={projectId} key={`${index}_${projectId}`} data-selected>
                    <span className='inline-block text-m font-medium leading-loose truncate ...'> {name}</span>
                    <MoreMenuButton menuItems={ProjectMenuItems} />
                  </div>
                )
            })}
          { children }
        </div>
    )
  }