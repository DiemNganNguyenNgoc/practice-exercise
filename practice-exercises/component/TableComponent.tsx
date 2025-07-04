"use client";

import { useState } from "react";

interface Column<MyTable> {
    header: string;
    key: keyof MyTable;
}
interface TableProps<MyTable> {
    columns: Column<MyTable>[];
    data: MyTable[];
}

export default function Table<MyTable extends object>({
    columns,
    data,
}: TableProps<MyTable>) {
    const [selectRow, setSelectRow] = useState<boolean[]>(new Array(data.length).fill(false));


    const handleSelectRow = (index: number, isChecked: boolean) => {
        const newRowSelect = [...selectRow];
        newRowSelect[index] = isChecked;
        setSelectRow(newRowSelect);
    }
    const countSelectedRow = selectRow.filter(Boolean).length;

  const handleSelectAll = (isChecked: boolean) => {
        setSelectRow(new Array(data.length).fill(isChecked));
    };

    return (
        <div>
            <label>
                {countSelectedRow} selected rows
            </label>
            <table className="table-auto border-collapse border border-gray-300 w-full ">
                <thead className="bg-gray-200">
                    <tr >
                        <th
                            className="border-b border-gray-300 px-4 py-2 text-center"
                        >
                            <input type="checkbox" className="w-[15px] h-[15px] cursor-pointer"
                                checked={countSelectedRow > 0}
                                onChange={(e) => handleSelectAll(e.target.checked)} />
                        </th>
                        <th
                            className="border-b border-gray-300 px-4 py-2 text-left"
                        >
                            No.
                        </th>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className="border-b border-gray-300 px-4 py-2 text-left"
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (

                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}
                                className="odd:bg-white even:bg-gray-100
                                 hover:bg-gray-300 cursor-pointer">
                                <td
                                    className="border-b border-gray-300 px-4 py-2 text-center"
                                >
                                    <input type="checkbox" className="w-[15px] h-[15px] hover:cursor-pointer"
                                        checked={selectRow[rowIndex]}
                                        onChange={(e) => handleSelectRow(rowIndex, e.target.checked)} />
                                </td>
                                <td
                                    className="border-b border-gray-300 px-4 py-2"
                                >
                                    {rowIndex + 1}
                                </td>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex}
                                        className="border-b border-gray-300 px-4 py-2">
                                        {String(row[col.key])}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-4">
                                No data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}