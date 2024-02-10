import { formatDistanceToNow } from 'date-fns';

import { cn } from '@/shared/lib/utils';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { Item } from '@/shared/common/interfaces';

interface ListProps {
  items: Item[];
  onOpenUpdate: (id: string) => void;
  onClose: () => void;
}
import { Checkbox } from '@/shared/components/ui/checkbox';
import { useTasksStore } from '@/store/useTask';
import { CheckCheck } from 'lucide-react';
import { AlertDialogComponent } from '@/shared/components/ui/alert-dialog';

export function List({ items, onOpenUpdate }: ListProps) {
  const { done } = useTasksStore();

  const onClickCheckbox = (id: string) => {
    done(id);
  };

  if (items.length === 0) {
    return (
      <div className='max-w-xl mx-auto text-center'>
        <p>lista de tareas vacia</p>
      </div>
    );
  }

  return (
    <ScrollArea className='h-screen mt-4'>
      <div className='flex flex-col gap-2 p-4 pt-0'>
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'cursor-pointer flex flex-col relative items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
            )}
            onClick={() => {
              onOpenUpdate(item.id);
            }}
          >
            <div className='absolute right-1 top-1 z-50'>
              <AlertDialogComponent id={item.id} />
            </div>
            <div className='flex w-full flex-col gap-1 pt-3'>
              <div className='flex items-center'>
                <div className='flex items-center gap-2'>
                  <h3 className='font-semibold text-xl'>{item.title}</h3>
                  {item.done && (
                    <CheckCheck className='' size={20} color='#252' />
                  )}
                </div>
                <div className={cn('ml-auto text-xs')}>
                  {formatDistanceToNow(item.createAt, {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>
            <p className='line-clamp-2 text-sm text-muted-foreground'>
              {item.description}
            </p>
            <div className='flex items-center justify-end w-full space-x-2 '>
              <label
                htmlFor='done'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                marcar como completada
              </label>
              <Checkbox
                id={item.id}
                checked={item.done}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickCheckbox(e.currentTarget.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
