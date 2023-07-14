const TextCell = ({
  text,
  className,
  as,
  input,
  inputVal,
  selectVal,
  onChange,
  name,
  options,
}) => {
  const As = as;
  return (
    <>
      {As && (
        <As className={className}>
          {input ? (
            <input
              type="text"
              onChange={onChange}
              name={name}
              value={inputVal}
            />
          ) : (
            text
          )}
          {options && (
            <select value={selectVal} name={name}>
              {options.map((d, i) => (
                <option key={i + 1} value={d}>
                  {d}
                </option>
              ))}
            </select>
          )}
        </As>
      )}
    </>
  );
};

export default TextCell;
