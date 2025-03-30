const Avatar = (
  { imgUrl, isOnline } = {
    imgUrl: "https://i.pravatar.cc/150?img=1",
    isOnline: false,
  }
) => {
  return (
    <div className="relative">
      <img
        className="w-[3rem] aspect-square rounded-full"
        src={imgUrl}
        alt={imgUrl}
      />
      {isOnline && (
        <span className="absolute -bottom-[0.2rem] right-0 w-[1rem] aspect-square  bg-[var(--cl-success)] rounded-full border-2 border-white"></span>
      )}
    </div>
  );
};

export default Avatar;
