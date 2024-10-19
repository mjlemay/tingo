import React, { useState } from 'react';
import {basicProjectType } from '../constants/defaults';
import TabHeaders from './tabheaders';
import Modal from './modal';
import Block from './block';
import Card from './card';
import Button from './button';
import {
    BackpackIcon,
    FaceIcon,
    DesktopIcon,
    PlayIcon,
    StopIcon
} from '@radix-ui/react-icons';

interface LaunchScreenProps {
    children?: React.ReactNode;
    selectedProject: basicProjectType;
    screenActionHandler?: Function;
  }
  
export default function LaunchScreen(props:LaunchScreenProps):JSX.Element {
  const { children, selectedProject } = props;
  const selectedModal = '';
  const [ openModal ] = useState(false);
  const [ live, setLive ] = useState(false);

  const handleActions = (action:string, value:string, payload:number) => {
    console.log(action, value, payload);
  }
    const modalElement = (selectedModal:string, action:string) => {
        console.log(selectedModal, action);
        return  '';
    };

    const closeModal = () => {}
    
  return (
    <div className="flex flex-col min-h-screen min-w-full max-h-screen max-w-full justify-top flex-nowrap">
    <div className="flex-full min-w-full justify-top max-h-[40px]">
      <TabHeaders projectTabs={[selectedProject]} actionHandler={handleActions} />
    </div>
    <div data-name="launchLayout" className='min-w-full max-h-screen max-h-full flex flex-col flex-grow'>
        <div data-name="stage" className="min-h-fit basis-1/2 grow rounded-lg border bg-gradient-to-b from-neutral-950 to-neutral-900 border-neutral-800 border-2 m-2">
              <Block title="Output Devices" icon={<DesktopIcon />}>
                test
              </Block>
        </div>
        <div data-name="config" className="min-h-fit basis-1/2 gap-x-2 grow flex-grow rounded-lg m-2 flex items-stretch">
            <div className="flex flex-row flex-full min-h-full basis-1/3 m-0 items-stretch *:min-w-full *:m-0">
            <Card>
              <Block title="Launch Settings" icon={<FaceIcon />}>
                <Button suffix={live ? <StopIcon /> : <PlayIcon />} handleAction={() => setLive(!live)}>{live ? 'SHUT DOWN' : 'GO LIVE'}</Button>
              </Block>
            </Card>
            </div>
            <div className="flex flex-row flex-full min-h-full basis-1/3 m-0 items-stretch *:min-w-full *:m-0">
                <Card></Card>
            </div>
            <div className="flex flex-row flex-full min-h-full basis-1/3 m-0 items-stretch *:min-w-full *:m-0">
                <Card>{children}</Card>
            </div>
        </div>
    </div>

    <div data-id="hidden-containers" className='absolute'>
      <Modal 
        open={openModal}
        closeHandler={closeModal}
        title={modalElement(selectedModal, 'title')}
        icon={<BackpackIcon />}
      >
        {modalElement(selectedModal, 'form')}
      </Modal>
    </div>
  </div>
  )
}