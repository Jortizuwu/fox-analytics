import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useEffect, useRef } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/shared/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';

import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';

import { formSchema, useDefualtValues } from './utils/form';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function TaskForm({ open, onClose }: Props) {
  const { defaultValues, submit, isUpdated } = useDefualtValues();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = form;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submit(values);
    onClose();
    reset();
  };

  const prevDefaultValuesRef = useRef(defaultValues);

  useEffect(() => {
    const prevDefaultValues = prevDefaultValuesRef.current;
    const currentDefaultValues = defaultValues;

    if (
      JSON.stringify(currentDefaultValues) !== JSON.stringify(prevDefaultValues)
    ) {
      reset(currentDefaultValues);
      prevDefaultValuesRef.current = currentDefaultValues;
    }
  }, [defaultValues, reset]);

  return (
    <Dialog open={open}>
      <DialogContent className='sm:max-w-[425px]'>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          variant='ghost'
          className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
        >
          <Cross2Icon className='h-4 w-4' />
          <span className='sr-only'>Close</span>
        </Button>
        <DialogHeader>
          <DialogTitle>
            {isUpdated ? 'Actualizar tarea' : 'Crear tarea'}
          </DialogTitle>
          <DialogDescription>
            Haz click en guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className='grid gap-4 py-4' onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input placeholder='titulo' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Textarea
                      className='col-span-3'
                      placeholder='descripcion'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose
                type='submit'
                className='w-full text-center  bg-primary p-2 rounded-md'
              >
                {isUpdated ? 'Actualizar' : 'Crear'}
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
