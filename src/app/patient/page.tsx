import { PatientList } from '@/components/patient/patient-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function PatientPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Users className='text-primary h-8 w-8' />
          <div>
            <h1 className='text-3xl font-bold'>Patient Management</h1>
            <p className='text-muted-foreground'>
              Manage patient records and information
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
        </CardHeader>
        <CardContent>
          <PatientList />
        </CardContent>
      </Card>
    </div>
  );
}
