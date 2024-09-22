import React, { useState } from 'react';
import Button from './button';
import Input from './input';
import ThumbsUpIcon from '../svg/thumbsUpIcon';
import { basicProjectType, createProjectType, defaultProject } from '../constants/defaults';
import { string, z } from 'zod';

interface NewProjectProps {
    exitHandler: Function;
    submitHandler: Function;
    defaultPayload?: basicProjectType | createProjectType;
}
  
export default function ProjectForm(props:NewProjectProps):JSX.Element {
  const { defaultPayload, exitHandler, submitHandler } = props;
  const defaultFormState = defaultPayload || defaultProject;
  const [ form, setForm ] = useState(defaultFormState);
  const [ errors, setErrors ] = useState({});

  const handleFormChange = (Event:React.ChangeEvent<HTMLInputElement>) => {
      const eventTarget = Event?.target;
      const clonedForm = JSON.parse(JSON.stringify(form));
      const formKey = eventTarget?.name;
      const formValue = eventTarget?.value;
      clonedForm[`${formKey}`] = formValue;
      setForm(clonedForm);
  }

  const validateForm = (formData:basicProjectType | createProjectType) => {
    const formSchema = z.object({
      name: z.string().min(1, 'Please supply a project name.'),
      description: z.string(),
    });
    try {
      formSchema.parse(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        let newErrs:Record<string, string> = {};
        err.errors.map(errItem => {
          const { path, message } = errItem;
          const key = path[0];
          newErrs[`${key}`] = message;
        })
        setErrors(newErrs);
      }
    }
  }

  const createNewProject = () => {
    validateForm(form);
    if (Object.keys(errors).length <= 0) {
      submitHandler(form);
      exitHandler('view','home');
    }
  }
  const getError = (key: string) => {
    return errors[key as keyof typeof string];
  } 

  return (
    <div className='p-2'>
      <div className='mb-4'>
          <Input name='projectId' value={form.projectId || -1} hidden changeHandler={()=>{}} />
          <Input name='is_template' value={form.is_template || 0} hidden changeHandler={()=>{}} /> 
          <Input 
            label='Project Name'
            name='name' value={form.name || ''}
            changeHandler={handleFormChange}
            errMsg={getError('name')}
            />
          <Input
            label='Description'
            name='description' value={form.description || ''}
            changeHandler={handleFormChange}
            errMsg={getError('description')}
            />
      </div>
      <div className='' >
        <Button suffix={<ThumbsUpIcon />} handleAction={() => createNewProject()}>LET'S GOOO!</Button>
      </div>
    </div>
  )
}