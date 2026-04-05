import { router } from '@inertiajs/react'
import { useState, useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group";



/* I just realize I shouldn't have used react-hook-form for something  */
export default function InputField({history = []}){
  // get the uuid when you enter address in
  const uuid = window.location.pathname.split('/')[2];

	const form = useForm({
    defaultValues: {
		  content : '',
    }
  })

  function onSubmit(data) {
    if (!data.content?.trim()) {
        return;
    }
    
    const prompt = { role : 'user', content: data.content };
    const newHistory = [...history, prompt];
    const title = newHistory[0].content.substring(0, 30);

    router.post('/prompt', { history: newHistory, uuid: uuid, title: title }, {onSuccess: () => form.reset()});
  }

  function onKeyDown(e) {
  	if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  }

  // detect prompt-typing without clicking on the form directly
  // issue = can't input the first typed key
  useEffect(() => {
  	function typingDetector(e) {
  		if (e.key.length === 1) {
        form.setFocus('content');
      }
  	}

  	document.addEventListener('keydown', typingDetector);
    
    return () => 
    document.removeEventListener('keydown', typingDetector);
  }, [form]);

	return(
		<form id="random" 
	        onSubmit={form.handleSubmit(onSubmit)}
	        onKeyDown={onKeyDown}>
      <FieldGroup>
        <Controller name="content" control={form.control} render={({field, fieldState}) => (
          <Field data-invalid={fieldState.invalid}>
            <InputGroup>
              <InputGroupTextarea
              	autoFocus
                autoComplete="off"
                {...field}
                id="random2"
                placeholder="Enter your prompts."
                //rows={6}
                className="max-h-64 overflow-y-auto resize-none"
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="block-end" className="flex justify-end">
                <Button type="submit">Submit</Button>
              </InputGroupAddon>
            </InputGroup>
          </Field>
              )} />
      </FieldGroup>
	  </form>
	);
};