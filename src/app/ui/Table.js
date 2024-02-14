import "@/app/ui/globals.css"
import { getDifficultyStyles } from "@/app/ui/utils.js"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

export default function Table({ problems }) {
    const columnHelper = createColumnHelper()

    const columns = [
      columnHelper.accessor('problemId', {
        header: () => <span>ID</span>,
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: () => 'Name',
        cell: info => <p className="text-left">{info.getValue()}</p>,
      }),
      columnHelper.accessor('difficulty', {
        header: () => 'Difficulty',
        cell: info => <span className={`inline-block ${getDifficultyStyles(info.getValue())}`}>{info.getValue()}</span>,
      }),
      columnHelper.accessor('topics', {
        header: () => 'Topics',
        cell: info => info.getValue().map((topic) => (
          <span className='bg-blue-200 rounded px-2 py-1 mr-2' key={topic}>{topic}</span>
        )),
      }),
      // TODO: add resourceLinks grouping. WE ONLY CARE WHETHER EACH LINK EXISTS OR NOT
      // Resources
      // M | S | V
    ]

    const table = useReactTable({
        data: problems,
        columns,
        initialState: { pagination: {pageSize: 5} },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

      })
    // table.setPageSize(5)

    return (
        <>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                        <th key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="text-center">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center gap-2">
                <button
                className="border rounded p-1"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                className="border rounded p-1"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                className="border rounded p-1"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                className="border rounded p-1"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>

                <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                    {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
                </strong>
                </span>
                <select
                value={table.getState().pagination.pageSize}
                onChange={e => {
                    table.setPageSize(Number(e.target.value))
                }}
                >
                {[5, 10, 20, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                    </option>
                ))}
                </select>
        </div>
      </>
    )
}