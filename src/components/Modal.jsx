const Modal = ({ isOpen, children }) => {
  console.log(isOpen);
  if (!isOpen) return;
  return (
    <div
      className={`absolute flex items-center justify-center top-0 left-0 bg-black/85 w-screen h-screen z-[10]`}
    >
      <div className="relative bg-white w-fit rounded">{children}</div>
    </div>
  );
};

export default Modal;
