import { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import SplashScreen from './components/splashScreen.tsx';
import WorkSpaceScreen from './components/workspaceScreen.tsx';
import { defaultProject, basicProjectType } from './constants/defaults.ts';
import SideMenuBar from './components/sideMenuBar.tsx';

function App() {
  const [ screen, setScreen ] = useState('splash');
  const [ project, setProject ] = useState(defaultProject as basicProjectType);

  const handleAction = (action:string, payload:basicProjectType) => {
    action && setScreen(action);
    payload && setProject(payload);
  }

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <div
    className={`flex w-screen bg-neutral-900 text-white`}
    data-theme={"darkTheme"}
  >
    <SideMenuBar screenActionHandler={handleAction}  />
    <div className={`flex flex-1 items-center justify-center`}>
      {screen == 'splash' && <SplashScreen screenActionHandler={handleAction} />}
      {screen == 'workspace' && <WorkSpaceScreen screenActionHandler={handleAction} selectedProject={project} />}
    </div>
  </div>
  );
}

export default App;
