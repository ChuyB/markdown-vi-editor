import Renderer from "../components/Renderer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Preview(): JSX.Element {
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
    <div className="Content light">
      <Renderer />
    </div>
  );
}
