import React, { useState } from 'react';
import HomeView from './homeView.tsx';
import ProjectForm from './projectForm.tsx';
import { createProjectType } from '../constants/defaults.ts';
import { projectData } from '../services/projectService.ts';
import Card from './card.tsx';
import ImageButton from './imageButton.tsx';
import Block from './block.tsx';
import CappyParty from '../svg/cappyParty.tsx';
import CappySport from '../svg/cappySport.tsx';
import CappyCalendar from '../svg/cappyCalendar.tsx';
import { BackpackIcon, Cross2Icon } from '@radix-ui/react-icons';

interface SplashScreenProps {
  children?: React.ReactNode;
  screenActionHandler: Function;
}
  
  export default function SplashScreen(props:SplashScreenProps):JSX.Element {
    const { children, screenActionHandler } = props;
    const [ view, setView ] = useState('home');

    const handleView = (action:string, value:string, payload:object) => {
      if (action == 'view') {
        setView(value);
      }
      if (action == 'screen') {
        screenActionHandler(value, payload);
      }
    }

    const handleSubmit = async (payload:createProjectType) => {
      await projectData.addProject(payload);
    }

    const closeBtn = (
      <button
          className="w-[40px] h-[40px] inline-flex items-center justify-center cursor-pointer outline-none"
          aria-label="Close"
          onClick={() => setView('home')}
      >
          <Cross2Icon />
      </button>
      );
  
    return (
      <div className='min-w-[800px] min-h-[600px]'>
        <Card>
          <div className='flex flex-row items-center'>
            <div className='grow w-full'>
              <div className='flex flex-col h-[600px]'>
                <ImageButton width={350} height={200} image="/images/cappySport.svg" label="Create A New Project" handleAction={() => setView('newProject')} />
                <ImageButton width={350} height={200} image="/images/cappyParty.svg" label="Start From A Template" handleAction={() => console.log('newTemplate')} />
                <ImageButton width={350} height={200} image="/images/cappyCalendar.svg" label="Select an Event" handleAction={() => console.log('viewEvents')} />
              </div>
            </div>
            <div className='grow w-full'>
              <div className="flex flex-col h-[600px] justify-top">
                {view == 'home' && <HomeView actionHandler={handleView} />}
                {view == 'newProject' &&  (
                  <Block title="Create New Project" icon={<BackpackIcon />} menu={closeBtn} >
                    <ProjectForm submitHandler={handleSubmit} exitHandler={handleView} />
                  </Block>
                )}
                {children}
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }
