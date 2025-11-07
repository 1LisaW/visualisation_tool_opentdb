import "./Button.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button = (props: ButtonProps) => {
  const { label, onClick } = props;
  return (
    <button className="jb-visual-tool-button" onClick={onClick}>
      {label}
    </button>
  );
};
