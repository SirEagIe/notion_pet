import JsonObject from "./JsonObject";
import JsonArray from "./JsonArray";
import { useState } from "react";

export default function Json() {
  const [jsonData, setJsonData] = useState("{}");
  const [isValidJson, setIsValidJson] = useState(true);
  const style = { fontFamily: "consolas, monospace" };

  function checkValid(data) {
    try {
      JSON.parse(data);
    } catch (e) {
      setIsValidJson(false);
      return;
    }
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
      <pre>{isValidJson && JSON.stringify(JSON.parse(jsonData), null, 2)}</pre>
      <hr />
      {isValidJson && (
        <>
          {JSON.parse(jsonData) instanceof Object && (
            <JsonObject data={JSON.parse(jsonData)} indent={0} path={"root"} />
          )}
          {JSON.parse(jsonData) instanceof Array && (
            <JsonArray data={JSON.parse(jsonData)} indent={0} path={"root"} />
          )}
        </>
      )}
      <hr />
    </div>
  );
}
