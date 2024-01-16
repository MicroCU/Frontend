type RadioProps = {
  name: string;
  title: string;
  checked: boolean;
  onSelect: () => void;
};

const Radio = ({ title, checked, onSelect, name }: RadioProps) => {
  return (
    <>
      <div className="space-x-2 align-middle flex">
        <input
          className="h-[30px] w-[30px] accent-primary"
          type="radio"
          id={title}
          value={title}
          name={name}
          checked={checked}
          onChange={onSelect}
        />
        <label htmlFor={title} className="Bold16 text-grayMain">
          {title}
        </label>
      </div>
    </>
  );
};
export default Radio;
