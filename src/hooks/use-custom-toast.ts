import { useToast } from '@/components/ui/use-toast';

export function useCustomToast() {
  const { toast } = useToast();

  return {
    success: (title: string, description: string) => {
      toast({
        title,
        description,
        duration: 3000, // 3 seconds
        variant: 'success',
      });
    },
    error: (title: string, description: string) => {
      toast({
        title,
        description,
        duration: 3000, // 3 seconds
        variant: 'destructive',
      });
    },
    warning: (title: string, description: string) => {
      toast({
        title,
        description,
        duration: 3000, // 3 seconds
        variant: 'warning',
      });
    },
  };
}
