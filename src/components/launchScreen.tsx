import React, { useState, useEffect } from 'react';
import { Window } from '@tauri-apps/api/window';
import { Webview } from '@tauri-apps/api/webview';
import {basicProjectType } from '../constants/defaults';
import TabHeaders from './tabheaders';
import Modal from './modal';
import Block from './block';
import Card from './card';
import DeviceCard from './deviceCard';
import Button from './button';
import DeviceForm from './deviceForm';
import {
    BackpackIcon,
    FaceIcon,
    DesktopIcon,
    PlayIcon,
    StopIcon,
    PlusCircledIcon,
} from '@radix-ui/react-icons';
import { defaultDevice, basicDeviceType, createDeviceType } from '../constants/defaults';
import { deviceData } from '../services/deviceService.ts';
import FullScreenViewer from './fullScreenViewer.tsx';

const LIMIT = 50;


interface LaunchScreenProps {
  children?: React.ReactNode;
  selectedProject: basicProjectType;
  screenActionHandler?: Function;
}

const defaultNewWindowOptions = {
  x: 50,
  y: 50,
  width: 400,
  height: 300
}
  
export default function LaunchScreen(props:LaunchScreenProps):JSX.Element {
  const { children, selectedProject } = props;
  const [ selectedModal, setSelectedModal ] = useState('');
  const [ selectedItem, setSelectedItem ] = useState('');
  const [ openModal, setOpenModal ] = useState(false);
  const [ live, setLive ] = useState(false);
  const [ isFullScreen, setIsFullScreen] = useState(false);
  const [ devices, setDevices ] = useState([]);
  const defaultWindowName:string[]= [];
  const [ deviceWindows, setDeviceWindows ] = useState(defaultWindowName);
  const [ hasFetched, setHasFetched ] = useState(false);

  const selectedDevice = () => {
    return defaultDevice;
  }


  // todo: remove any!!
  const fetchData = async () => {
    await deviceData.getDevicesByType('output', LIMIT).then((data:any) => {
      let fetchItem:Record<string,any> = {};
      if ((devices[0] || data[0]) && selectedItem !== '') {
        if (devices.length < data.length) {
          fetchItem = data[data.length - 1];
        }
        if (devices.length > data.length) {
          fetchItem = devices[0];
        }
        if (devices.length != data.length) {
          setSelectedItem(`device_${fetchItem.ruleId}`);
        }
      } else {
        setSelectedItem('');
      }
      setDevices(data);
      setHasFetched(true);
    });
  };

  const toggleNewWindow = async (name:string, toggle:boolean, options:Record<string, string>) => {
      const windowCount = deviceWindows.length || 0;
      const windowName =  `${name}_${windowCount}`;
    if (toggle) {
      console.log(name, toggle);
      const appWindow = new Window(windowName, {title: options.title});
      const webview = new Webview(appWindow, 'theUniqueLabel', {
        ...defaultNewWindowOptions, 
        url: 'http://www.google.com'
      });
      appWindow.once('tauri://created', function () {
        // window successfully created
        console.log('tauri://created');
       });
       appWindow.once('tauri://error', function (err) {
        // an error happened creating the window
        console.log('tauri://error', err);
       });
       webview.once('tauri://created', function () {
        // window successfully created
        console.log('tauri://created');
       });
       webview.once('tauri://error', function (err) {
        // an error happened creating the window
        console.log('tauri://error', err);
       });
      let windowNameArr = deviceWindows;
      windowNameArr.push(windowName);
      setDeviceWindows(windowNameArr)
    } else {

    }
  }

    const handleActions = (action:string, value:string, payload:number | createDeviceType | Record<string, string>) => {
        switch (action) {
            case 'openModal':
                setSelectedModal(value);
                setOpenModal(true);
                break;
            case 'openFullScreen':
                setIsFullScreen(true);
                break;
            case 'closeFullScreen':
                setIsFullScreen(false);
                break;
            case 'openNewWindow':
                toggleNewWindow('newWindow', true, payload as Record<string, string>);
                break;
              case 'closeNewWindow':
                toggleNewWindow('newWindow', false, payload as Record<string, string>);   
                break;
            case 'create':
                value === 'device' && deviceData.addDevice(payload as createDeviceType);
                break;
            default:
                break;
        }
    }

    const closeModal = () => {
    setOpenModal(false);
    setSelectedModal('');
    }


    useEffect(()=> { !hasFetched && fetchData() }, [hasFetched]);

    const addBtn = (
        <button
            className="w-[40px] h-[40px] p-0 flex items-center justify-center border-none cursor-pointer outline-none"
            aria-label="Add"
            onClick={() => handleActions('openModal', 'addDevice', defaultDevice)}
        >
            <PlusCircledIcon />
        </button>
    );

    const modalElement = (selectedModal:string, action:string ) => {
        const modal = selectedModal || null;
        const modalKey = action || null;
        const modalSections:Record<string, any> = {
          editDevice: {
            title: 'Edit Device Details',
            form: <DeviceForm 
              submitHandler={(payload:basicDeviceType)=> handleActions('edit', 'device', payload)} 
              exitHandler={()=> closeModal()}
              defaultPayload={selectedDevice()}
              />
          },
          addDevice: {
            title: 'Add New Device',
            form: <DeviceForm 
              submitHandler={(payload:basicDeviceType)=> handleActions('create', 'device', payload)} 
              exitHandler={()=> closeModal()}
              defaultPayload={defaultDevice}
              />
          }
        }
        return modalKey && modal && modalSections[modal as string][modalKey as string];
      }
    
  return (
    <div className="flex flex-col min-h-screen min-w-full max-h-screen max-w-full justify-top flex-nowrap">
    <div className="flex-full min-w-full justify-top max-h-[40px]">
      <TabHeaders projectTabs={[selectedProject]} actionHandler={handleActions} />
    </div>
    <div data-name="launchLayout" className='min-w-full max-h-full max-h-full flex flex-col flex-grow'>
        <div data-name="stage" className="min-h-fit basis-1/2 grow rounded-lg border bg-gradient-to-b from-neutral-950 to-neutral-900 border-neutral-800 border-2 m-2 *:min-w-full *:m-0">
              <Block title="Output Devices" icon={<DesktopIcon />} menu={addBtn}>
                <div className="flex flex-row grow min-h-full flex-nowrap">
                {devices.map(device => {
                    const { name, type, deviceId, description } = device;
                    return <DeviceCard name={name} key={`DeviceCard_${deviceId}`} type={type} deviceId={deviceId} actionHandler={handleActions} description={description} />
                })}
                </div>
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
    <FullScreenViewer isFullScreen={isFullScreen} actionHandler={handleActions} />
  </div>
  )
}