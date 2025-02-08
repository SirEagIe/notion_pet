import JsonObject from "./JsonObject";
import JsonArray from "./JsonArray";
import { useState, useRef } from "react";

export default function JsonNode({ dataKey, data, indent, needComma, path }) {
  return (
    <>
      {dataKey !== null && (
        <>
          "{dataKey}"<span style={{ whiteSpace: "pre" }}>: </span>
        </>
      )}
      {typeof data === "object" &&
        !(data instanceof Array) &&
        data !== null && (
          <>
            <JsonObject data={data} indent={4 + indent} path={path} />
            {needComma && ","}
            <span style={{ color: "#aaa", whiteSpace: "pre" }}> {path}</span>
          </>
        )}
      {typeof data === "object" && data instanceof Array && (
        <>
          <JsonArray data={data} indent={4 + indent} path={path} />
          {needComma && ","}
          <span style={{ color: "#aaa", whiteSpace: "pre" }}> {path}</span>
        </>
      )}
      {typeof data === "string" && (
        <>
          "{data}"{needComma && ","}
          <span style={{ color: "#aaa", whiteSpace: "pre" }}> {path}</span>
        </>
      )}
      {typeof data === "number" && (
        <>
          {data}
          {needComma && ","}
          <span style={{ color: "#aaa", whiteSpace: "pre" }}> {path}</span>
        </>
      )}
      {typeof data === "boolean" && (
        <>
          {data.toString()}
          {needComma && ","}
          <span style={{ color: "#aaa", whiteSpace: "pre" }}> {path}</span>
        </>
      )}
      {data === null && (
        <>
          null
          {needComma && ","}
          <span style={{ color: "#aaa", whiteSpace: "pre" }}> {path}</span>
        </>
      )}
    </>
  );
}
