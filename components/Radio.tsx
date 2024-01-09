type RadioProps = {
  name: string;
  title: string;
  checked: boolean;
  onClick: () => void;
};

const Radio = ({ title, checked, onClick, name }: RadioProps) => {
  return (
    <>
      <div className="space-x-2 align-middle flex">
        <input type="radio" name={name} className="h-[30px] w-[30px]" />
        <label className="Bold16 text-grayMain">{title}</label>
      </div>
    </>
  );
};
export default Radio;
