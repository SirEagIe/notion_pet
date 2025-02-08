import JsonObject from "./JsonObject";
import JsonArray from "./JsonArray";
import { useState } from "react";

export default function Json() {
  const [jsonData, setJsonData] = useState("{}");
  const [parseError, setParseError] = useState(null);
  const [isValidJson, setIsValidJson] = useState(true);
  const style = { fontFamily: "consolas, monospace" };

  function checkValid(data) {
    try {
      JSON.parse(data);
    } catch (e) {
      setIsValidJson(false);
      console.log(e);
      setParseError(e.toString());
      return;
    }
    setParseError(null);
    setIsValidJson(true);
  }

  return (
    <div style={style}>
      <textarea
        style={{ width: "100%", height: "25vh" }}
        value={jsonData}
        onChange={(e) => {
          setJsonData(e.target.value);
          checkValid(e.target.value);
        }}
      ></textarea>
      <hr />
      <pre>
        {isValidJson ? (
          JSON.stringify(JSON.parse(jsonData), null, 2)
        ) : (
          <p>{parseError}</p>
        )}
      </pre>
      <hr />
      {isValidJson ? (
        <>
          {typeof JSON.parse(jsonData) === "object" &&
            !(JSON.parse(jsonData) instanceof Array) && (
              <JsonObject
                data={JSON.parse(jsonData)}
                indent={0}
                path={"root"}
              />
            )}
          {typeof JSON.parse(jsonData) === "object" &&
            JSON.parse(jsonData) instanceof Array && (
              <JsonArray data={JSON.parse(jsonData)} indent={0} path={"root"} />
            )}
        </>
      ) : (
        <p>{parseError}</p>
      )}
      <hr />
    </div>
  );
}
