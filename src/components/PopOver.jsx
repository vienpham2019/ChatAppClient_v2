import { Popover } from "react-tiny-popover";

export const PopoverMenu = ({
  isOpen,
  setIsOpen,
  positions = ["bottom", "top"],
  padding = 1,
  reposition = true,
  onClickOutside = () => clickOutsideCapture && setIsOpen(false),
  content,
  children,
  containerClassName = "",
  clickOutsideCapture = true,
}) => {
  return (
    <Popover
      isOpen={isOpen}
      containerClassName={containerClassName}
      clickOutsideCapture={clickOutsideCapture}
      positions={positions} // if you'd like, you can limit the positions
      padding={padding} // adjust padding here!
      reposition={reposition} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
      onClickOutside={onClickOutside} // handle click events outside of the popover/target here!
      content={content}
    >
      {children}
    </Popover>
  );
};
