import JsonObject from './JsonObject'
import JsonArray from './JsonArray'
import './Json.scss'
import { useState, useEffect, useRef } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa6'

export default function Json() {
  const [jsonData, setJsonData] = useState(
    '[ { "id": 1, "name": "Leanne Graham", "username": "Bret", "email": "Sincere@april.biz", "address": { "street": "Kulas Light", "suite": "Apt. 556", "city": "Gwenborough", "zipcode": "92998-3874", "geo": { "lat": "-37.3159", "lng": "81.1496" } }, "phone": "1-770-736-8031 x56442", "website": "hildegard.org", "company": { "name": "Romaguera-Crona", "catchPhrase": "Multi-layered client-server neural-net", "bs": "harness real-time e-markets" } }]'
  )
  const [parseError, setParseError] = useState(null)
  const [isValidJson, setIsValidJson] = useState(true)
  const [theme, setTheme] = useState('light')
  const [showRawJson, setShowRawJson] = useState(true)
  const rawJsonDiv = useRef()

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
    <div
      class="container"
      style={{ maxWidth: '100%', width: '100%', margin: '0 0' }}
    >
      <div className="row mb-3">
        <div className="col"></div>
        <div className="col text-center">
          <a
            className="btn btn-primary"
            onClick={(event) => {
              if (rawJsonDiv.current.style.display !== 'block') {
                rawJsonDiv.current.style.display = 'block'
                event.target.innerHTML = 'Hide raw'
              } else {
                rawJsonDiv.current.style.display = 'none'
                event.target.innerHTML = 'Show raw'
              }
              setShowRawJson(!showRawJson)
            }}
          >
            Hide raw
          </a>
        </div>
        <div className="col text-end">
          <a
            className="btn btn-primary"
            onClick={() => {
              theme == 'dark' ? setTheme('light') : setTheme('dark')
            }}
          >
            {theme == 'light' ? <FaSun /> : <FaMoon />}
          </a>
        </div>
      </div>
      <div className="row">
        <div
          ref={rawJsonDiv}
          className={
            showRawJson ? 'col-xl-6 col-lg-6 col-12 mb-4' : 'col-0 mb-4'
          }
          style={{ display: 'block' }}
        >
          <div className="row mb-3 text-center">
            <div className="col">
              <a
                className="btn btn-primary btn-sm"
                onClick={() => {
                  isValidJson &&
                    setJsonData(JSON.stringify(JSON.parse(jsonData), null, 2))
                }}
              >
                Make pretty
              </a>
            </div>
          </div>
          <div className="row" style={{ height: '100%' }}>
            <div className="col">
              <textarea
                className="form-control fix-height overflow-scroll"
                value={jsonData}
                onChange={(e) => {
                  setJsonData(e.target.value)
                  checkValid(e.target.value)
                }}
                style={{
                  minHeight: '30vh',
                  height: '100%',
                  width: '100%',
                  whiteSpace: 'nowrap',
                }}
              ></textarea>
            </div>
          </div>
        </div>
        <div
          className={
            showRawJson ? 'col-xl-6 col-lg-6 col-12 mb-4' : 'col-12 mb-4'
          }
          style={{ whiteSpace: 'nowrap' }}
        >
          <div className="row mb-3 text-center">
            <div className="col mb-4">
              {/* <a className="btn btn-primary btn-sm">asd</a> */}
            </div>
          </div>
          {isValidJson ? (
            <div className="overflow-scroll">
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
            </div>
          ) : (
            <p className="json-error">{parseError}</p>
          )}
        </div>
      </div>
    </div>
  )
}
