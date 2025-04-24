import React, { useState, useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getFilteredRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TradingSignal } from '@/types';
import { format } from 'date-fns';

interface SignalsTableProps {
  data: TradingSignal[];
}

const SignalsTable: React.FC<SignalsTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'DATE', desc: true }
  ]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Define columns for trading signals
  const columns = useMemo<ColumnDef<TradingSignal>[]>(() => [
    {
      accessorKey: 'DATE',
      header: 'Date',
      cell: ({ row }) => format(new Date(row.getValue('DATE')), 'MMM dd, yyyy'),
    },
    {
      accessorKey: 'TOKEN_SYMBOL',
      header: 'Symbol',
      cell: ({ row }) => <div className="font-medium">{row.getValue('TOKEN_SYMBOL')}</div>,
    },
    {
      accessorKey: 'TOKEN_NAME',
      header: 'Name',
    },
    {
      accessorKey: 'TRADING_SIGNAL',
      header: 'Signal',
      cell: ({ row }) => {
        const signal = row.getValue('TRADING_SIGNAL') as number;
        return (
          <Badge variant={signal === 1 ? "default" : "destructive"}>
            {signal === 1 ? 'Buy' : 'Sell'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'TM_TRADER_GRADE',
      header: 'Grade',
      cell: ({ row }) => {
        const grade = row.getValue('TM_TRADER_GRADE') as number;
        let color;
        if (grade >= 70) color = "text-green-600";
        else if (grade >= 50) color = "text-yellow-600";
        else color = "text-red-600";
        
        return <div className={`font-medium ${color}`}>{grade.toFixed(1)}</div>;
      },
    },
    {
      accessorKey: 'TOKEN_TREND',
      header: 'Trend',
      cell: ({ row }) => {
        const trend = row.getValue('TOKEN_TREND') as number;
        return trend === 1 ? (
          <div className="flex items-center text-green-600">
            <ChevronUp className="mr-1 h-4 w-4" />Bullish
          </div>
        ) : (
          <div className="flex items-center text-red-600">
            <ChevronDown className="mr-1 h-4 w-4" />Bearish
          </div>
        );
      },
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search signals..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'flex items-center cursor-pointer select-none'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ChevronUp className="ml-2 h-4 w-4" />,
                          desc: <ChevronDown className="ml-2 h-4 w-4" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SignalsTable;