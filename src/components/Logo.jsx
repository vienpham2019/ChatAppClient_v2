const Logo = ({ isMobile } = { isMobile: false }) => {
  return (
    <div className="flex items-center gap-[0.3rem]">
      <div className="flex h-8 w-8 items-center justify-center">
        <div className="grid grid-cols-2 gap-0.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`Logo-${i}`}
              className="h-3 w-3 rounded bg-[var(--cl-prim-700)]"
            ></div>
          ))}
          <div className="h-3 w-3 rounded bg-[var(--cl-prim-400)]"></div>
        </div>
      </div>
      {!isMobile && <span className="text-xl font-bold">Chat on</span>}
    </div>
  );
};

export default Logo;
