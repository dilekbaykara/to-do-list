import { useState } from "react";

type ButtonProps = React.HTMLProps<HTMLButtonElement>;
export function Button(props: ButtonProps) {
  const [color, setColor] = useState("pink");
  const [textColor, setTextColor] = useState("green");
  return (
    <button
      style={{ background: color, color: textColor }}
      id="activeButton"
      onClick={() => {
        setColor("pink");
        setTextColor("green");
      }}
    >
      {props.children}
    </button>
  );
}
// export const Button: React.FC = ({ children }) => {
//   const [color, setColor] = useState("pink");
//   const [textColor, setTextColor] = useState("green");
//   return (
//     <button
//       style={{ background: color, color: textColor }}
//       className="statusButton"
//       onClick={() => {
//         setColor("pink");
//         setTextColor("green");
//       }}
//     >
//       {children}
//     </button>
//   );
// };
