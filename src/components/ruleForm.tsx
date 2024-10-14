import React, { useState } from 'react';
import Button from './button';
import Input from './input';
import ThumbsUpIcon from '../svg/thumbsUpIcon';
import { basicRuleType, createRuleType, defaultRule } from '../constants/defaults';
import { string, z } from 'zod';

interface NewRuleProps {
    exitHandler: Function;
    submitHandler: Function;
    defaultPayload?: basicRuleType | createRuleType;
}
  
export default function RuleForm(props:NewRuleProps):JSX.Element {
  const { defaultPayload, submitHandler, exitHandler } = props;
  const defaultFormState = defaultPayload || defaultRule;
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

  const validateForm = (formData:basicRuleType | createRuleType) => {
    const formSchema = z.object({
      name: z.string().min(1, 'Please supply a rule name.'),
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

  const createNewRule = () => {
    validateForm(form);
    if (Object.keys(errors).length <= 0) {
      submitHandler(form);
      exitHandler();
    }
  }
  const getError = (key: string) => {
    return errors[key as keyof typeof string];
  } 

  return (
    <div className='p-2'>
      <div className='mb-4'>
          <Input name='ruleId' value={form.ruleId || -1} hidden changeHandler={()=>{}} />
          <Input 
            label='Rule Name'
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
        <Button suffix={<ThumbsUpIcon />} handleAction={() => createNewRule()}>LET'S GOOO!</Button>
      </div>
    </div>
  )
}