// src/pages/BasicTable.jsx

import React, { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columnDeff } from "../components/columns"; // Adjust the path as needed
import mockData from "../components/data.json"; // Adjust the path as needed

const BasicTable = () => {
  const columns = useMemo(() => columnDeff, []);
  const data = useMemo(() => mockData, []);

  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnOrder: [
        "first_name",
        "last_name",
        "id",
        "country",
        "date_of_birth",
      ],
      columnVsibility: {
        id: false,
      },
      expanded: true,
    },
  });

  return (
    <div className="p-4">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((headerColumn) => (
                <th
                  key={headerColumn.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {flexRender(
                    headerColumn.column.columnDef.header,
                    headerColumn.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
