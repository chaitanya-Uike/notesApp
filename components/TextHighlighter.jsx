import React from "react";
import { Text } from "react-native";
// string.prototype.matchAll doesnt work in android
import matchAll from "string.prototype.matchall";

function TextHighlighter({ sourceText, highlightedText, style }) {
  if (!highlightedText) return <Text style={style}>{sourceText}</Text>;

  let indexes = [];
  // the highlightedText regex may not be safe so try it first

  try {
    indexes = [...matchAll(sourceText, new RegExp(highlightedText, "gi"))].map(
      (a) => a.index
    );
  } catch (error) {
    return <Text style={style}>{sourceText}</Text>;
  }

  const highlightLength = highlightedText.length;
  let pointer = 0;

  return (
    <Text style={style}>
      {indexes.map((index, idx) => {
        let subString = (
          <Text key={idx} style={style}>
            {sourceText.slice(pointer, index)}
            <Text
              style={[
                style,
                {
                  backgroundColor: "#F0E6FF99",
                  padding: "5px 1px",
                },
              ]}
            >
              {sourceText.slice(index, index + highlightLength)}
            </Text>
          </Text>
        );
        pointer = index + highlightLength;
        return subString;
      })}
      <Text style={style}>{sourceText.slice(pointer, sourceText.length)}</Text>
    </Text>
  );
}

export default TextHighlighter;
