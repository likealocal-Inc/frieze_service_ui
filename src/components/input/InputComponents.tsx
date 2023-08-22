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
      <div className='w-full'>
        <input
          className={
            isError
              ? `w-full border-red-500 placeholder-[#bbbbbb] pl-[12px] text-slate-800 text-[16px] bg-[#f5f6fa] rounded-[10px] h-[56px] focus:border-1 focus:border-red-600 focus:outline-none outline-red-500`
              : `w-full placeholder-[#bbbbbb] pl-[12px] text-[#262628] text-[16px] border-0 bg-[#f5f6fa] rounded-[10px] h-[56px] focus:shadow-none focus:outline-none focus:ring-2 focus:ring-[#BBBBBB] `
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          {...(required ? { required: true } : {})}
        />
        {isError ? (
          <div
            className='ml-[10px] mt-[4px] text-[#FF3A30]'
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
