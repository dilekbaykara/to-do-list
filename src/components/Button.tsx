interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  active: true | false;
  color: string;
  textColor: string;
}

export function Button(props: ButtonProps) {
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
