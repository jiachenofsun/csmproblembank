// TODO: generateStaticParams from db data

export default function Problem({ params }) {
    return (
      <main className="flex flex-col flex-grow items-center justify-between p-24">
        <div className="text-5xl font-bold text-center my-4 text-csmGreen">
          Problem ID: {params.id}
        </div>
      </main>
    )
    
  }