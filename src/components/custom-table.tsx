import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ITableColumnDefinition<T> {
  name: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface ITableProps<T> {
  title: string;
  columns: ITableColumnDefinition<T>[];
  data: T[];
}

export function CustomTable<T>({
  columns,
  data,
  title,
}: ITableProps<T>): React.ReactNode {
  return (
    <Table>
      <TableCaption>{title}</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={String(column.name)}>
              {String(column.name)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((column) => (
              <TableCell key={String(column.name)}>
                {column.render
                  ? column.render(row[column.name], row)
                  : row[column.name]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
