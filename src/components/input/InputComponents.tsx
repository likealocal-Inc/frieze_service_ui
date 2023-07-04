export interface InputComponentProps {
  onChange: Function;
  required?: boolean;
  placeholder?: string;
  value: string;
  isError?: boolean;
  errorMsg?: string;
}
export default function InputComponent({
  onChange,
  required = false,
  placeholder = "",
  value,
  isError = false,
  errorMsg = "",
}: InputComponentProps) {
  return (
    <>
      <div className=''>
        <input
          className={
            isError
              ? // ? // ? `w-[350px] shadow-none outline-none ring-1 ring-red-500 placeholder-[#bbbbbb] pl-[12px] text-slate-800 text-[16px] bg-[#f5f6fa] rounded-[10px] relative border-0 h-[56px] `
                `w-[350px] border-red-500 placeholder-[#bbbbbb] pl-[12px] text-slate-800 text-[16px] bg-[#f5f6fa] rounded-[10px] relative  h-[56px] focus:border-1 focus:border-slate-600 focus:outline-none `
              : `w-[350px] placeholder-[#bbbbbb] pl-[12px] text-[#262628] text-[16px] border-0 bg-[#f5f6fa] rounded-[10px] relative h-[56px] focus:shadow-none focus:outline-none focus:ring-2 focus:ring-[#BBBBBB] `
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          {...(required ? { required: true } : {})}
        />
        {isError ? (
          <div
            className='ml-[10px] mt-[4px] text-[#FF3A30] text-error text-left relative w-[256.25px] flex items-center justify-start'
            style={{ font: "400 12px 'Noto Sans CJK KR', sans-serif" }}
          >
            {errorMsg}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
