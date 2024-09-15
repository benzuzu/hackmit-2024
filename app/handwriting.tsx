import React, { useEffect } from "react";
import Vara from "vara";

export function VaraText({ text }: { text: string }) {
    useEffect(() => {
      const container = document.getElementById("vara-container");
      if (container) {
        container.innerHTML = "";
      }
  
      const vara = new Vara(
        "#vara-container",
        "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
        [
          {
            text: text,
            fontSize: 80,
            strokeWidth: 2,
            y: 20
          },
        ]
      );
  
      return () => {
        if (container) {
          container.innerHTML = "";
        }
      };
    }, [text]);
  
    return (
      <div
        id="vara-container"
        className="z-20 flex justify-center items-center max-w-full"
        style={{ whiteSpace: "nowrap", overflow: "hidden" }}
      ></div>
    );
}
