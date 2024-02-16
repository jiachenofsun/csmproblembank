import "@/app/ui/globals.css"
import { getDifficultyStyles, getResourceLinkStyles, getColumnWidth } from "@/app/ui/utils.js"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useMemo, useCallback } from "react"

export default function Table({ problems }) {
    const router = useRouter()
    const handleRowClick = (problemId) => {
      router.push(`/id/${problemId}`)
    }

    const [columnFilters, setColumnFilters] = useState([])

    const columnHelper = createColumnHelper()
    
    function booleanFilter(row, columnId, filterValue) {
      console.log('x')
      if (filterValue === null) {
        return true
      } else {
        return row.getValue(columnId) === filterValue
      }
    }

    const columns = [
      columnHelper.accessor('problemId', {
        header: () => 'ID',
        id: 'problemId',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: () => 'Name',
        id: 'name',
        cell: info => <p className="text-center sm:text-left w-full">{info.getValue()}</p>,
      }),
      columnHelper.accessor('difficulty', {
        header: () => 'Difficulty',
        id: 'difficulty',
        cell: info => <span className={`inline-block ${getDifficultyStyles(info.getValue())}`}>{info.getValue()}</span>,
      }),
      columnHelper.accessor('topics', {
        header: () => 'Topics',
        id: 'topics',
        cell: info => info.getValue().map((topic) => (
          <span className='bg-blue-200 rounded px-2 py-1 mr-2' key={topic}>{topic}</span>
        )),
      }),
      columnHelper.accessor(row => row.resourceLinks.meta.trim() !== '' ? true : false, {
        header: () => 'M',
        id: 'meta',
        filterFn: booleanFilter,
        cell: info => <div className={`w-5 h-5 rounded-full ${getResourceLinkStyles(info.getValue())}`}></div>,
      }),
      columnHelper.accessor(row => row.resourceLinks.slides.trim() !== '' ? true : false, {
        header: () => 'S',
        id: 'slides',
        filterFn: booleanFilter,
        cell: info => <div className={`w-5 h-5 rounded-full ${getResourceLinkStyles(info.getValue())}`}></div>,
      }),
      columnHelper.accessor(row => row.resourceLinks.video.trim() !== '' ? true : false, {
        header: () => 'V',
        id: 'video',
        filterFn: booleanFilter,
        cell: info => <div className={`w-5 h-5 rounded-full ${getResourceLinkStyles(info.getValue())}`}></div>,
      }),
    ]

    const table = useReactTable({
        data: problems,
        columns,
        initialState: { pagination: {pageSize: 5} },
        state: {
          columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
      })

    return (
        <>
            <table className="w-4/5">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                        <th key={header.id} className={`bg-csmGreenDesat border border-gray-400 px-4 py-2 ${getColumnWidth(header.column.columnDef.header)}`}>
                          <>
                            <div>
                              {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            </div>
                            {header.column.getCanFilter() ? (
                              <div className="">
                                <Filter column={header.column} table={table} />
                              </div>
                            ) : null}
                          </>
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

function Filter({ column, table }) {
  // const firstValue = table
  //   .getPreFilteredRowModel()
  //   .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()
  const onChangeMemoized = useCallback(
    value => {
      column.setFilterValue(value);
    },
    [column]
  );

  const sortedUniqueValues = useMemo(() => {
    switch(column.id) {
      case 'meta':
      case 'video':
      case 'slides':
      case 'problemId':
        return []
      default:
        return Array.from(column.getFacetedUniqueValues().keys()).sort()
    }
  }, [column.getFacetedUniqueValues()])

  switch (column.id) {
    case 'meta':
    case 'video':
    case 'slides':

      return (
          <select onChange={(event) => column.setFilterValue(JSON.parse(event.target.value))}>
            <option value="null">All</option>
            <option value="true">Done</option>
            <option value="false">Empty</option>
          </select>
      )

    // case 'problemId':
    //   return (

    //   )

    // case 'topics':
    //   return (

    //   )

    default:
      return (
        <>
          <datalist id={column.id + 'list'}>
            {sortedUniqueValues.slice(0, 50).map((value) => (
              <option value={value} key={value} />
            ))}
          </datalist>
          <DebouncedInput
            type="text"
            value={(columnFilterValue ?? '')}
            onChange={onChangeMemoized}
            placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
            className="w-2/3 min-w-16 border shadow rounded"
            list={column.id + 'list'}
          />
          <div className="h-1" />
        </>
      )
  }
}

// A debounced input react component
function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce]);

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  );
}
