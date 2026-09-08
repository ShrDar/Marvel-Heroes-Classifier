interface ComicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

function ComicButton({
  children,
  onClick,
  disabled = false,
  type = "button",
}: ComicButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="font-comic w-full cursor-pointer rounded-lg border-4 border-black bg-transparent backdrop-blur-2xl backdrop-brightness-125 px-8 py-3 text-2xl tracking-wide shadow-[2px_2px_0_0_#000] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export default ComicButton;