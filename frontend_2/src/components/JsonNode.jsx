import JsonObject from './JsonObject'
import JsonArray from './JsonArray'
import { useState, useRef } from 'react'

export default function JsonNode({
  dataKey,
  data,
  indent,
  nestingLevel,
  needComma,
  path,
}) {
  return (
    <>
      {dataKey !== null && (
        <>
          <span className="json-sign">"</span>
          <span className={'json-string-key-' + Math.min(nestingLevel, 9)}>
            {dataKey}
          </span>
          <span className="json-sign">"</span>
          <span className="json-sign">: </span>
        </>
      )}
      {typeof data === 'object' &&
        !(data instanceof Array) &&
        data !== null && (
          <>
            <JsonObject
              data={data}
              indent={4 + indent}
              nestingLevel={nestingLevel}
              path={path}
            />
            {needComma && <span className="json-sign">,</span>}
            <span className="json-path"> {path}</span>
          </>
        )}
      {typeof data === 'object' && data instanceof Array && (
        <>
          <JsonArray
            data={data}
            indent={4 + indent}
            nestingLevel={nestingLevel}
            path={path}
          />
          {needComma && <span className="json-sign">,</span>}
          <span className="json-path"> {path}</span>
        </>
      )}
      {typeof data === 'string' && (
        <>
          <span className="json-sign">"</span>
          <span className="json-string-value">{data}</span>
          <span className="json-sign">"</span>
          {needComma && <span className="json-sign">,</span>}
          <span className="json-path"> {path}</span>
        </>
      )}
      {typeof data === 'number' && (
        <>
          <span className="json-value">{data}</span>
          {needComma && <span className="json-sign">,</span>}
          <span className="json-path"> {path}</span>
        </>
      )}
      {typeof data === 'boolean' && (
        <>
          <span className="json-value">{data.toString()}</span>
          {needComma && <span className="json-sign">,</span>}
          <span className="json-path"> {path}</span>
        </>
      )}
      {data === null && (
        <>
          <span className="json-value">null</span>
          {needComma && <span className="json-sign">,</span>}
          <span className="json-path"> {path}</span>
        </>
      )}
    </>
  )
}
