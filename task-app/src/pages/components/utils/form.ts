import { useCallback } from 'react';
import { z } from 'zod';
import { useTasksStore } from '@/store/useTask';
import { toast } from 'sonner';

export const formSchema = z.object({
  title: z.string().min(2, {
    message: 'El título debe tener al menos 2 caracteres.',
  }),
  description: z.string().optional(),
});

const defaultValues = {
  title: '',
  description: '',
};

export const useDefualtValues = () => {
  const { create, update, tasks, activeId } = useTasksStore();

  const active = tasks.find((item) => item.id === activeId);

  const createTask = useCallback(
    (values: z.infer<typeof formSchema>) => {
      create(values);
      toast('Tarea creada');
    },
    [create],
  );

  const updateTask = useCallback(
    (values: z.infer<typeof formSchema>) => {
      update(values);
      toast('Tarea actualizada');
    },
    [update],
  );

  return {
    isUpdated: activeId ? true : false,
    submit: activeId ? updateTask : createTask,
    defaultValues: activeId
      ? {
          title: active?.title || '',
          description: active?.description || '',
        }
      : defaultValues,
  };
};
