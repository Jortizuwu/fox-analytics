import { Separator } from '@/shared/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { List } from './components/list';
import { TaskForm } from './components/form';
import { useTasksStore } from '@/store/useTask';
import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import { ModeToggle } from '@/shared/components/dark-togle';

function Home() {
  const [open, setOpen] = useState(false);

  const { tasks, setActive } = useTasksStore();

  const onOpenUpdate = (id: string) => {
    setOpen(true);
    setActive(id);
  };

  const openCreate = () => {
    setOpen(true);
    setActive(null);
  };

  const onClose = () => {
    setOpen(false);
    setActive(null);
  };

  return (
    <div className='max-w-xl mx-auto'>
      <div className='top-4 right-4 fixed'>
        <ModeToggle />
      </div>

      <Tabs defaultValue='all'>
        <div className='flex items-center px-4 py-2'>
          <h1 className='text-xl font-bold'>lista de tarea</h1>
          <TabsList className='ml-auto'>
            <TabsTrigger
              value='all'
              className='text-zinc-600 dark:text-zinc-200'
            >
              Todas las tareas
            </TabsTrigger>
            <TabsTrigger
              value='unread'
              className='text-zinc-600 dark:text-zinc-200'
            >
              Completadas
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator />
        <div className='bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
          <div className='relative w-full'>
            <Button
              onClick={openCreate}
              variant='default'
              type='button'
              className='w-full text-center'
            >
              <span className='mr-2'>Crear tarea</span>
              <Plus className='h-4 w-4' />
            </Button>
            <TaskForm open={open} onClose={onClose} />
          </div>
        </div>
        <TabsContent value='all' className='m-0'>
          <List items={tasks} onClose={onClose} onOpenUpdate={onOpenUpdate} />
        </TabsContent>
        <TabsContent value='unread' className='m-0'>
          <List
            onClose={onClose}
            onOpenUpdate={onOpenUpdate}
            items={tasks.filter((item) => item.done)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Home;
