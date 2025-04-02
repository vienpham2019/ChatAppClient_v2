const Tooltip = ({ text, dir = "top", children }) => {
  const getDirection = () => {
    let posBodyClass = "left-1/2 -translate-x-1/2";
    let posArrowClass = "left-1/2 -bottom-[4px]";
    switch (dir) {
      case "top":
        posBodyClass =
          "left-1/2 -translate-x-1/2 bottom-full -translate-y-[0.1rem]";
        posArrowClass = "left-1/2 -bottom-[4px]";
        break;
      case "bottom":
        posBodyClass =
          "left-1/2 -translate-x-1/2 top-full translate-y-[0.7rem]";
        posArrowClass = "left-1/2 -top-[4px]";
        break;

      case "right":
        posBodyClass =
          "left-full -translate-y-1/2 top-1/2 translate-x-[0.5rem]";
        posArrowClass = "-left-[4px] -translate-y-1/2 top-1/2";
        break;
      case "left":
        posBodyClass =
          "right-full -translate-y-1/2 top-1/2 -translate-x-[0.5rem]";
        posArrowClass = "-right-[4px] -translate-y-1/2 top-1/2";
        break;
    }
    return (
      <div
        className={`z-10 absolute ${posBodyClass} mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity`}
      >
        {text}
        <div
          className={`absolute ${posArrowClass} w-2 h-2 bg-gray-800 rotate-45`}
        ></div>
      </div>
    );
  };
  return (
    <div className="relative group">
      {children}
      {getDirection()}
    </div>
  );
};

export default Tooltip;
