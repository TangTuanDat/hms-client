'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal, ConfirmationModal } from '@/components/ui/modal';
import { useNotification } from '@/components/ui/notification';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { success, error, warning } = useNotification();

  const handleConfirmAction = () => {
    // Simulate an action
    console.log('Action confirmed!');
    success({
      title: 'Success',
      description: 'The action was completed successfully!',
    });
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <div className='space-y-4'>
        <h1 className='mb-8 text-4xl font-bold'>Component Examples</h1>

        {/* Basic Modal Example */}
        <div className='space-y-2'>
          <h2 className='text-2xl font-semibold'>Modal Example</h2>
          <Button onClick={() => setIsModalOpen(true)}>Open Basic Modal</Button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title='Basic Modal Example'
          >
            <div className='py-4'>
              <p className='text-muted-foreground text-sm'>
                This is a basic modal example. You can put any content here.
              </p>
            </div>
          </Modal>
        </div>

        {/* Confirmation Modal Example */}
        <div className='space-y-2'>
          <h2 className='text-2xl font-semibold'>Confirmation Modal Example</h2>
          <Button onClick={() => setIsConfirmModalOpen(true)}>
            Open Confirmation Modal
          </Button>
          <ConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            message='Are you sure you want to perform this action?'
            onConfirm={handleConfirmAction}
            confirmText='Yes, proceed'
            cancelText='No, cancel'
          />
        </div>

        {/* Notification Examples */}
        <div className='space-y-2'>
          <h2 className='text-2xl font-semibold'>Notification Examples</h2>
          <div className='flex gap-2'>
            <Button
              onClick={() =>
                success({
                  title: 'Success',
                  description: 'Operation completed successfully!',
                })
              }
            >
              Show Success
            </Button>
            <Button
              variant='destructive'
              onClick={() =>
                error({
                  title: 'Error',
                  description: 'Something went wrong!',
                })
              }
            >
              Show Error
            </Button>
            <Button
              variant='outline'
              onClick={() =>
                warning({
                  title: 'Warning',
                  description: 'Please review your changes.',
                })
              }
            >
              Show Warning
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
