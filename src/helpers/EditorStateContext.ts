import React from "react";
import { EditorValues } from "./types";

export const EditorStateContext = React.createContext<EditorValues | null>(
  null
);
