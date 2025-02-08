import { useRef } from "react";
import JsonArray from "./JsonArray";
import JsonNode from "./JsonNode";

export default function JsonObject({ data, indent, path }) {
  const container = useRef();
  const containerIndent = useRef();

  return (
    <>
      <span>{"{"}</span>
      <button
        style={{ opacity: "0.2" }}
        onClick={() => {
          if (container.current.style.display !== "block") {
            container.current.style.display = "block";
            containerIndent.current.style.display = "inline";
          } else {
            container.current.style.display = "none";
            containerIndent.current.style.display = "none";
          }
        }}
      >
        ...
      </button>
      <div ref={container} style={{ display: "block" }}>
        {Object.keys(data).map((dataKey, idx) => (
          <div>
            <span style={{ whiteSpace: "pre" }}>{" ".repeat(indent + 4)}</span>
            <JsonNode
              dataKey={dataKey}
              data={data[dataKey]}
              indent={indent}
              needComma={idx !== Object.keys(data).length - 1}
              path={path + '["' + dataKey + '"]'}
            />
          </div>
        ))}
      </div>
      <span
        ref={containerIndent}
        style={{ whiteSpace: "pre", display: "inline" }}
      >
        {" ".repeat(indent)}
      </span>
      <span>{"}"}</span>
    </>
  );
}
