// import { useState } from "react";

// type ButtonProps = React.HTMLProps<HTMLButtonElement>;

// export function Button(props: ButtonProps) {
//   const [color, setColor] = useState("pink");
//   const [textColor, setTextColor] = useState("green");

//   return (
//     <button
//       style={{ background: color, color: textColor }}
//       onClick={() => {
//         setColor("pink");
//         setTextColor("green");
//       }}
//     >
//       {props.children}
//     </button>
//   );
// }

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  active: true | false;
  color: string;
  textColor: string;
}

export function Button(props: ButtonProps) {
  // const [color, setColor] = useState("pink");
  // const [textColor, setTextColor] = useState("green");

  return (
    <button
      id={props.id}
      className={props.className}
      onClick={props.onClick}
      style={{
        backgroundColor: props.active ? props.color : "transparent",
        color: props.active ? props.textColor : "#ffff",
      }}
    >
      {props.children}
    </button>
  );
}

// export function Button(props: ButtonProps) {
//   // const [color, setColor] = useState("pink");
//   //  const [textColor, setTextColor] = useState("green");
//   if (props.active === true)
//     return (
//       <button style={{ background: props.color }}>{props.children}</button>
//     );
//   else return <button>{props.children}</button>;
// }

// export function Button(props: ButtonProps) {
//   const [color, setColor] = useState("pink");
//   const [textColor, setTextColor] = useState("green");
//   const [buttonClicked, setButtonClicked] = useState(false);
//   const [buttonsNotClicked, setButtonsNotClicked] = useState(false);

//   function buttonClick() {
//     setButtonClicked(true);
//     setButtonsNotClicked(true);
//   }

//   if (buttonClicked) {
//     return (
//       <button
//         style={{ background: color, color: textColor }}
//         id="activeButton"
//         onClick={() => {
//           setColor("pink");
//           setTextColor("green");
//         }}
//       >
//         {props.children}
//       </button>
//     );
//   }

//   if (buttonsNotClicked) {
//     return <button className="statusButton">{props.children}</button>;
//   }
//   buttonClicked()
// }
