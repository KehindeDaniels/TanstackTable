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

  const { getHeaderGroups } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  //   console.log(getHeaderGroups());
  return (
    <table>
      <thead>
        {/* get header group */}
        {getHeaderGroups().map((headerGroup) => (
          // display as header row
          <tr key={headerGroup.id}>
            {console.log(headerGroup)}
            {headerGroup.headers.map((headerColumn) => (
              <th key={headerColumn.id}>
                {flexRender(
                  headerColumn.column.columnDef.header,
                  headerColumn.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
    </table>
  );
};

export default BasicTable;
