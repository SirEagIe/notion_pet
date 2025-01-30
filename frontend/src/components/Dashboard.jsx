import Column from './Column'

export default function Dashboard({ data }) {
  return (
    <div className="row" style={{ backgroundColor: 'antiquewhite' }}>
      <p>{data.name}</p>
      {data.columns.map((column) => (
        <Column key={column.id} data={column} />
      ))}
    </div>
  )
}
