import { useRef } from 'react'
import JsonArray from './JsonArray'
import JsonNode from './JsonNode'

export default function JsonObject({ data, indent, nestingLevel, path }) {
  const container = useRef()
  const containerIndent = useRef()

  return (
    <>
      <span className="json-sign">{'{'}</span>
      <a
        className="btn btn-outline-primary btn-sm"
        style={{ opacity: '0.3' }}
        onClick={(e) => {
          if (container.current.style.display !== 'block') {
            e.target.innerHTML = '-'
            container.current.style.display = 'block'
            containerIndent.current.style.display = 'inline'
          } else {
            e.target.innerHTML = '+'
            container.current.style.display = 'none'
            containerIndent.current.style.display = 'none'
          }
        }}
      >
        -
      </a>
      <div ref={container} style={{ display: 'block' }}>
        {Object.keys(data).map((dataKey, idx) => (
          <div>
            <span style={{ whiteSpace: 'pre' }}>{' '.repeat(indent + 4)}</span>
            <JsonNode
              dataKey={dataKey}
              data={data[dataKey]}
              indent={indent}
              nestingLevel={nestingLevel + 1}
              needComma={idx !== Object.keys(data).length - 1}
              path={path + '["' + dataKey + '"]'}
            />
          </div>
        ))}
      </div>
      <span
        ref={containerIndent}
        style={{ whiteSpace: 'pre', display: 'inline' }}
      >
        {' '.repeat(indent)}
      </span>
      <span className="json-sign">{'}'}</span>
    </>
  )
}
