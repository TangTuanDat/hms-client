import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationOptions {
  title?: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

export function useNotification() {
  const { toast } = useToast();

  const showNotification = (
    type: NotificationType,
    options: NotificationOptions,
  ) => {
    const { title, description, action, duration = 5000 } = options;

    const variant = {
      success: {
        className: 'bg-green-500 text-white',
        icon: '✓',
      },
      error: {
        className: 'bg-red-500 text-white',
        icon: '✕',
      },
      warning: {
        className: 'bg-yellow-500 text-white',
        icon: '⚠',
      },
      info: {
        className: 'bg-blue-500 text-white',
        icon: 'ℹ',
      },
    }[type];

    toast({
      title,
      description,
      duration,
      action: action ? (
        <ToastAction altText={action.label} onClick={action.onClick}>
          {action.label}
        </ToastAction>
      ) : undefined,
      className: variant.className,
    });
  };

  return {
    success: (options: NotificationOptions) =>
      showNotification('success', options),
    error: (options: NotificationOptions) => showNotification('error', options),
    warning: (options: NotificationOptions) =>
      showNotification('warning', options),
    info: (options: NotificationOptions) => showNotification('info', options),
  };
}

// Example usage:
/*
const { success, error, warning, info } = useNotification();

// Success notification
success({
  title: "Success",
  description: "Operation completed successfully",
});

// Error notification with action
error({
  title: "Error",
  description: "Something went wrong",
  action: {
    label: "Retry",
    onClick: () => handleRetry(),
  },
});

// Warning notification
warning({
  description: "Please review your changes",
});

// Info notification
info({
  title: "Information",
  description: "New features available",
  duration: 3000,
});
*/
