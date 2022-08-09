import styles from "styles/preview.module.scss";
import Renderer from "../components/Renderer";
import { useContext, useEffect } from "react";
import { EditorStateContext } from "@/helpers/EditorStateContext";
import { useNavigate } from "react-router-dom";
import { EditorValues } from "@/helpers/types";

export default function Preview(): JSX.Element {
  const { state } = useContext(EditorStateContext) as EditorValues;
  const navigate = useNavigate();
  const redirect = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "h") {
      navigate("/", { replace: true });
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", redirect);
    return () => {
      document.removeEventListener("keydown", redirect);
    };
  }, []);

  return (
    <div className={styles.Preview}>
      <Renderer state={state ? state : ""} />
    </div>
  );
}
