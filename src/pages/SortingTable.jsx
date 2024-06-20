import React, { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import { columnDeff } from "../components/columns"; // Adjust the path as needed
import mockData from "../components/data.json"; // Adjust the path as needed

const SortingTable = () => {
  const columns = useMemo(() => columnDeff, []);
  const data = useMemo(() => mockData, []);
  const [sorting, setSorting] = useState([
    { id: columns[1].accessorKey, desc: true },
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  const handleSort = (columnId, direction) => {
    setSorting([{ id: columnId, desc: direction === "desc" }]);
    setDropdownOpen((p) => !p);
  };

  return (
    <div className="p-4">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((headerColumn) => (
                <th
                  key={headerColumn.id}
                  className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => setDropdownOpen(headerColumn.id)}
                >
                  {flexRender(
                    headerColumn.column.columnDef.header,
                    headerColumn.getContext()
                  )}
                  {{
                    asc: "👆",
                    desc: "👇",
                  }[headerColumn.column.getIsSorted()] ?? null}
                  {console.log(table.getState().sorting)}

                  {dropdownOpen === headerColumn.id && (
                    <div className="absolute top-full left-0 mt-2 w-32 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
                      <div
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() =>
                          handleSort(headerColumn.column.id, "asc")
                        }
                      >
                        Ascending Order
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() =>
                          handleSort(headerColumn.column.id, "desc")
                        }
                      >
                        Descending Order
                      </div>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {table.getRowModel().rows.map((row) => (
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

export default SortingTable;
