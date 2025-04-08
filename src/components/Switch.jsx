const Switch = ({ lable, checked, onChecked }) => {
  const switchId = Math.random().toString(36).substring(2, 9);

  return (
    <div className="inline-flex gap-2">
      <div className="relative inline-block w-11 h-5">
        <input
          id={switchId}
          type="checkbox"
          checked={checked}
          onClick={onChecked}
          className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
        />
        <label
          htmlFor={switchId}
          className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
        ></label>
      </div>

      <label
        htmlFor={switchId}
        className="text-slate-600 text-sm cursor-pointer"
      >
        <div>
          <p className="text-slate-500">{lable}</p>
        </div>
      </label>
    </div>
  );
};

export default Switch;
