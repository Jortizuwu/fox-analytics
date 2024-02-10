import { Item } from '@/shared/common/interfaces';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { v4 as uuidv4 } from 'uuid';

interface Payload {
  title: string;
  description?: string;
}

interface BearState {
  activeId: string | null;
  tasks: Item[];
  setActive: (id: string | null) => void;
  create: (payload: Payload) => void;
  update: (payload: Payload) => void;
  deleteTask: (id: string) => void;
  done: (id: string) => void;
}

export const useTasksStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        activeId: null,
        tasks: [],
        create: (payload) =>
          set((state) => ({
            tasks: [
              {
                createAt: new Date(),
                deleteAt: new Date(),
                description: payload?.description,
                done: false,
                id: uuidv4(),
                title: payload.title,
                updateAt: new Date(),
              },
              ...state.tasks,
            ],
          })),
        update: (payload) =>
          set((state) => ({
            tasks: state.tasks.map((task) => {
              if (state.activeId)
                if (task.id === state.activeId) {
                  return {
                    ...task,
                    description: payload.description,
                    title: payload.title,
                  };
                }
              return task;
            }),
          })),
        deleteTask: (id) =>
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
          })),
        done: (id) =>
          set((state) => ({
            tasks: state.tasks.map((task) => {
              if (task.id === id) {
                return {
                  ...task,
                  done: !task.done,
                };
              }
              return task;
            }),
          })),
        setActive: (id) =>
          set(() => ({
            activeId: id,
          })),
      }),
      {
        name: 'tasks-storage',
      },
    ),
  ),
);
