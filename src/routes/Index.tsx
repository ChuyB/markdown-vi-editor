import { useContext, useEffect } from "react";
import Editor from "@/components/Editor";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    fileManager: {
      openDialog: (
        method: string,
        config: any,
        callback: (err: any, data: any) => void
      ) => Promise<string>;
    };
  }
}

export default function Index(): JSX.Element {
  const navigate = useNavigate();
  const redirect = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "h") {
      navigate("/preview", { replace: true });
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
      <Editor />
    </div>
  );
}
