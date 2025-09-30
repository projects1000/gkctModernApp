import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DataTable = ({ data, columns, onRowClick, actions }) => {
  const getStatusColor = (status) => {
    const lowerStatus = status?.toLowerCase() || '';
    if (lowerStatus.includes('active') || lowerStatus.includes('delivered') || lowerStatus.includes('verified')) {
      return 'bg-green-100 text-green-800';
    }
    if (lowerStatus.includes('transit') || lowerStatus.includes('pending')) {
      return 'bg-yellow-100 text-yellow-800';
    }
    if (lowerStatus.includes('maintenance') || lowerStatus.includes('cancelled') || lowerStatus.includes('rejected')) {
      return 'bg-red-100 text-red-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  const renderCellContent = (row, column) => {
    const value = row[column.key];
    if (column.key === 'status' || column.key === 'verified') {
      const statusText = typeof value === 'boolean' ? (value ? 'Verified' : 'Pending') : value;
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(statusText)}`}>
          {statusText}
        </span>
      );
    }
    if (column.key === 'actions' && actions) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actions.map(action => (
              <DropdownMenuItem key={action.label} onClick={() => action.onClick(row)}>
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return value;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? data.map((row, index) => (
            <motion.tr
              key={row.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="hover:bg-gray-50 transition-colors"
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {renderCellContent(row, column)}
                </td>
              ))}
            </motion.tr>
          )) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-10 text-gray-500">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;