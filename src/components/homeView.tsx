import { useState, useEffect } from 'react';
import { projectData } from '../services/projectService.ts';
import { basicProjectType } from '../constants/defaults';
import Block from '../components/block.tsx';
import MenuItem from '../components/menuItem.tsx';
import { BackpackIcon, MixIcon } from '@radix-ui/react-icons'

interface HomeViewProps {
    actionHandler: Function;
}

const LIMIT = 5;
  
export default function HomeView(props:HomeViewProps):JSX.Element {
  const { actionHandler } = props;
  const defaultProjects:basicProjectType[] = [];
  const [ projects, setProjects ] = useState(defaultProjects);
  const [ hasFetched, setFetched ] = useState(false);

  const fetchData = async () => {
    await projectData.getProjects(LIMIT).then((data:basicProjectType[]) => {
      setProjects(data);
      setFetched(true);
    });
  };

  useEffect(()=> {
    if (!hasFetched) {
      fetchData();
    }
  }, [hasFetched]);

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1">
        <Block title="Recent Projects" icon={<BackpackIcon width={20} height={20} />}>
              <div className="flex flex-col">
                <div>
                {projects && projects.map((project, index) => {
                  return (
                    <MenuItem 
                      key={`$_item_${index}_${project.name}`}
                      label={project.name} 
                      prefix={<BackpackIcon />}
                      handleAction={() => actionHandler('screen', 'workspace', project)}
                    />
                  )
                })}
                </div>
              </div>
        </Block>
        </div>
        <div className="flex-1">
        <Block title="Recent Components" icon={<MixIcon width={20} height={20} />}>
            <MenuItem label="TBD" prefix={<MixIcon />} />
        </Block>
        </div>
    </div>
  )
}