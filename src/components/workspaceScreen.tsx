import React, { useState, useEffect } from 'react';
import Modal from './modal';
import ProjectForm from './projectForm';
import RuleForm from './ruleForm';
import Block from './block';
import Card from './card';
import RuleIcon from '../svg/ruleIcon';
import ConfirmationForm from './confirmationForm';
import ScrollBox from './scrollBox';
import { textCopy } from '../constants/language';
import { defaultProject, defaultRule, basicProjectType, basicRuleType } from '../constants/defaults';
import TabHeaders from './tabheaders';
import { 
  BackpackIcon,
  FileTextIcon,
  PlusCircledIcon
} from '@radix-ui/react-icons';
import PlayBookView from './playBookView';
import { projectData } from '../services/projectService.ts';
import { ruleData } from '../services/ruleService.ts';
import MenuItem from './menuItem.tsx';
import { string } from 'zod';


interface WorkspaceScreenProps {
  children?: React.ReactNode;
  selectedProject: basicProjectType;
  screenActionHandler?: Function;
}

const LIMIT = 100;
const LIST_ITEM_HEIGHT = 24;
const LIST_ITEM_VIEW_LIMIT = 8;

const defaultRules:basicRuleType[] = [];
  
export default function WorkspaceScreen(props:WorkspaceScreenProps):JSX.Element {
  const { selectedProject = defaultProject, screenActionHandler = ()=>{}} = props;
  const { projectId = -1 } = selectedProject;
  const [ selectedModal, setSelectedModal ] = useState('');
  const [ selectedItem, setSelectedItem ] = useState('');
  const [ openModal, setOpenModal ] = useState(false);
  const { confirmDelete } = textCopy;
  const [ rules, setRules ] = useState(defaultRules);
  const [ hasFetched, setFetched ] = useState(false);

  const listItemViewHeight = (limit:number) => {
    let listItemViewLimit = limit < LIST_ITEM_VIEW_LIMIT ? limit : LIST_ITEM_VIEW_LIMIT;
    listItemViewLimit = listItemViewLimit * LIST_ITEM_HEIGHT;
    if (limit > LIST_ITEM_VIEW_LIMIT ) {
      listItemViewLimit = listItemViewLimit - (LIST_ITEM_HEIGHT / 2);
    }
    return listItemViewLimit;
  }

  // todo: remove any!!
  const fetchData = async () => {
    await ruleData.getProjectRules(projectId, LIMIT).then((data:any) => {
      let fetchItem:Record<string,any> = {};
      if ((rules[0] || data[0]) && selectedItem !== '') {
        if (rules.length <= data.length) {
          fetchItem = data[data.length - 1];
        } else {
          fetchItem = rules[0];
        }
        setSelectedItem(`rule_${fetchItem.ruleId}`);
      } else {
        setSelectedItem('');
      }
      setRules(data);
      setFetched(true);
    });
  };

  const activateModal = (modal:string) => {
    setSelectedModal(modal);
    setOpenModal(true);
  }
  const closeModal = () => {
    setOpenModal(false);
    setSelectedModal('');
  }

    // todo: remove any!!
  const submitUpdateProject = async (payload:basicProjectType) => {
    await projectData.updateProject(payload).then((data:any) => {
      screenActionHandler('workspace', data[0]);
    });
  }

    // todo: remove any!!
  const submitUpdateRule = async (payload:basicRuleType) => {
    await ruleData.updateRule(payload).then((data:any) => {
      screenActionHandler('workspace', data[0]);
      setFetched(false);
    });
  }

  const submitDeleteProject = async (payload:basicProjectType) => {
    await projectData.deleteProject(payload).then(() => {
      screenActionHandler('splash');
    });
  }

  const submitDeleteRule = async (ruleId:number) => {
    await ruleData.deleteRule(ruleId).then(() => {
      screenActionHandler('workspace');
      setFetched(false);
    });
  }

  const submitAddRule = async (payload:basicRuleType) => {
    const creationPayload = {...payload, projectId};
    await ruleData.addRule(creationPayload).then((data:any) => {
      screenActionHandler('workspace', data[0]);
      setFetched(false);
    });
  }


  const handleActions = (action:string, value:string, payload:basicRuleType | number) => {
    switch (action) {
      case 'openModal':
          activateModal(value);
        break;
      case 'create':
        value === 'rule' && submitAddRule(payload as basicRuleType);
        break;
      case 'delete':
        value === 'rule' && submitDeleteRule(payload as number);
        break;
      case 'update':
        let updateItem = selectedRule();
        updateItem.jsonBody = JSON.stringify(payload);
        value === 'rule' && submitUpdateRule(updateItem as basicRuleType);
        break;
      default:
        break;
    }
  }

  const selectedRule = () => {
    const itemId = selectedItem && selectedItem.split('_')[1];
    const ruleData = rules.filter(rule => rule.ruleId === parseInt(itemId)) || [];
    return ruleData[0];
  }
  const selectedWorkView = () => {
    let workView = <></>;
    const selectedView:string = selectedItem && selectedItem.split('_')[0] || '';
    const workViews = {
      rule: {
        view:  <PlayBookView ruleItem={selectedRule()} actionHandler={handleActions} />
      }
    }
    if(workViews[selectedView as keyof typeof string] && workViews[selectedView as keyof typeof string]['view']) {
      workView = workViews[selectedView as keyof typeof string]['view'];
    }
    return workView;
  }

  useEffect(()=> {
    if (!hasFetched) {
      fetchData();
    }
  }, [hasFetched]);


  const addBtn = (
    <button
        className="w-[40px] h-[40px] p-0 flex items-center justify-center border-none cursor-pointer outline-none"
        aria-label="Add"
        onClick={() => handleActions('openModal', 'addRule', defaultRule)}
    >
        <PlusCircledIcon />
    </button>
    );

  const modalElement = (selectedModal:string, action:string ) => {
    const modal = selectedModal || null;
    const modalKey = action || null;
    const modalSections:Record<string, any> = {
      configProject: {
        title: 'Configure » Delete',
        form: <ConfirmationForm 
          confirmHandler={(payload:basicProjectType)=> submitDeleteProject(payload)} 
          denyHandler={()=> closeModal()} 
          confirmMessage={confirmDelete}
          defaultPayload={selectedProject}
          />
      },
      editProject: {
        title: 'Edit Project',
        form: <ProjectForm 
          submitHandler={(payload:basicProjectType)=> submitUpdateProject(payload)} 
          exitHandler={()=> closeModal()}
          defaultPayload={selectedProject}
          />
      },
      editRule: {
        title: 'Edit Rule Details',
        form: <RuleForm 
          submitHandler={(payload:basicRuleType)=> submitUpdateRule(payload)} 
          exitHandler={()=> closeModal()}
          defaultPayload={selectedRule()}
          />
      },
      addRule: {
        title: 'Create New Rule',
        form: <RuleForm 
          submitHandler={(payload:basicRuleType)=> submitAddRule(payload)} 
          exitHandler={()=> closeModal()}
          defaultPayload={defaultRule}
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
      <div data-name="workLayout" className='min-w-full max-h-screen justify-stretch items-stretch flex flex-row flex-grow'>
          <div data-name="sidebar" className="min-w-[250px]">
            <Card>
              <Block title="Rulebooks" icon={<RuleIcon />} menu={addBtn}>
                <ScrollBox height={listItemViewHeight(rules.length)}>
                  {rules.map(rule => {
                    const { name, ruleId } =rule;
                    const itemKey = `rule_${ruleId}`;
                    return (
                      <MenuItem 
                        key={itemKey}
                        selected={selectedItem === itemKey}
                        label={name} 
                        prefix={<FileTextIcon />}
                        handleAction={() => setSelectedItem(itemKey)}
                      />
                    )}
                  )}
                </ScrollBox>
              </Block>
            </Card>
          </div>
          <div data-name="stage" className="grow min-h-fit max-h-full rounded-lg bg-neutral-950 mt-2 mb-2 mr-2">
            {selectedWorkView()}
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