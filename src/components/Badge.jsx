const Badge = ({ num }) => {
  return (
    <div className="absolute rounded-full border-[2px] border-white -top-1 -right-1 h-[1.3rem] aspect-square flex items-center justify-center p-0 bg-red-500 text-white text-xs">
      {num}
    </div>
  );
};

export default Badge;
