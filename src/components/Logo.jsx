const Logo = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center">
        <div className="mr-2 flex h-8 w-8 items-center justify-center">
          <div className="grid grid-cols-2 gap-0.5">
            {Array.from({ length: 3 }).map(() => (
              <div className="h-3 w-3 rounded bg-[var(--cl-prim-700)]"></div>
            ))}
            <div className="h-3 w-3 rounded bg-[var(--cl-prim-400)]"></div>
          </div>
        </div>
        <span className="text-xl font-bold">Text Me</span>
      </div>
    </div>
  );
};

export default Logo;
