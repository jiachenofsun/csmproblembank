import "@/app/ui/globals.css"
import { getDifficultyStyles, getResourceLinkStyles, getColumnWidth } from "@/app/ui/utils.js"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'




export default function Table({ problems }) {
    const router = useRouter()

    const handleRowClick = (problemId) => {
      router.push(`/id/${problemId}`)
    }

    const columnHelper = createColumnHelper()

    const columns = [
      columnHelper.accessor('problemId', {
        header: () => 'ID',
        id: 'problemId',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: () => 'Name',
        cell: info => <p className="text-center sm:text-left w-full">{info.getValue()}</p>,
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
      columnHelper.accessor('resourceLinks.meta', {
        header: () => 'M',
        cell: info => <div className={`w-5 h-5 rounded-full ${getResourceLinkStyles(info.getValue())}`}></div>,
      }),
      columnHelper.accessor('resourceLinks.slides', {
        header: () => 'S',
        cell: info => <div className={`w-5 h-5 rounded-full ${getResourceLinkStyles(info.getValue())}`}></div>,
      }),
      columnHelper.accessor('resourceLinks.video', {
        header: () => 'V',
        cell: info => <div className={`w-5 h-5 rounded-full ${getResourceLinkStyles(info.getValue())}`}></div>,
      }),
    ]

    const table = useReactTable({
        data: problems,
        columns,
        initialState: { pagination: {pageSize: 5} },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

      })

    return (
        <>
            <table className="w-4/5">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                        <th key={header.id} className={`bg-csmGreenDesat border border-gray-400 px-4 py-2 ${getColumnWidth(header.column.columnDef.header)}`}>
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
                    <tr key={row.id} onClick={() => handleRowClick(row.getValue('problemId'))} className="cursor-pointer py-2 hover:bg-gray-200">
                      
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className={`border border-gray-400 px-4 py-2 ${getColumnWidth(cell.column.columnDef.header)}`}>
                          <div className="flex text-center justify-center items-center">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                        </td>
                        ))}
                      
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex items-center gap-2">
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