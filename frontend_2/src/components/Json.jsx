import JsonObject from './JsonObject'
import JsonArray from './JsonArray'
import './Json.scss'
import { useState, useEffect } from 'react'

export default function Json() {
  const [jsonData, setJsonData] = useState(
    '[ { "id": 1, "name": "Leanne Graham", "username": "Bret", "email": "Sincere@april.biz", "address": { "street": "Kulas Light", "suite": "Apt. 556", "city": "Gwenborough", "zipcode": "92998-3874", "geo": { "lat": "-37.3159", "lng": "81.1496" } }, "phone": "1-770-736-8031 x56442", "website": "hildegard.org", "company": { "name": "Romaguera-Crona", "catchPhrase": "Multi-layered client-server neural-net", "bs": "harness real-time e-markets" } }]'
  )
  const [parseError, setParseError] = useState(null)
  const [isValidJson, setIsValidJson] = useState(true)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function checkValid(data) {
    try {
      JSON.parse(data)
    } catch (e) {
      setIsValidJson(false)
      setParseError(e.toString())
      return
    }
    setParseError(null)
    setIsValidJson(true)
  }

  return (
    <div class="container">
      <div className="row text-end mb-2">
        <div className="col">
          <a
            className="btn btn-primary"
            onClick={() => {
              theme == 'dark' ? setTheme('light') : setTheme('dark')
            }}
          >
            Switch theme
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4 col-lg-4 mb-4">
          <textarea
            style={{ width: '100%', height: '100%' }}
            value={jsonData}
            onChange={(e) => {
              setJsonData(e.target.value)
              checkValid(e.target.value)
            }}
          ></textarea>
        </div>
        <div
          className="col-xl-8 col-lg-8 mb-4"
          style={{ whiteSpace: 'nowrap' }}
        >
          {isValidJson ? (
            <>
              {typeof JSON.parse(jsonData) === 'object' &&
                !(JSON.parse(jsonData) instanceof Array) && (
                  <JsonObject
                    data={JSON.parse(jsonData)}
                    indent={0}
                    nestingLevel={0}
                    path={'root'}
                  />
                )}
              {typeof JSON.parse(jsonData) === 'object' &&
                JSON.parse(jsonData) instanceof Array && (
                  <JsonArray
                    data={JSON.parse(jsonData)}
                    indent={0}
                    nestingLevel={0}
                    path={'root'}
                  />
                )}
            </>
          ) : (
            <p className="json-error">{parseError}</p>
          )}
        </div>
      </div>
    </div>
  )
}
