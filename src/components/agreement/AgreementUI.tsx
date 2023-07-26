export interface AgreeComponentProp {
  title: string;
  onClick: Function;
  onShowAgreement: Function;
}
export const AgreeComponent = ({
  title,
  onClick,
  onShowAgreement,
}: AgreeComponentProp) => {
  return (
    <div className='w-[350px]'>
      <div className='flex flex-row justify-start'>
        <input
          type='checkbox'
          value=''
          className='bg-[#ffffff] rounded border-solid border-gray-3 border w-5 h-5'
          onClick={(e) => onClick(e)}
        />
        <div
          className='relative flex items-center justify-end text-right text-gray-6 ml-[5px]'
          style={{
            font: "400 15px/22px 'Pretendard', sans-serif",
            textDecoration: "underline",
          }}
          onClick={(e) => onShowAgreement()}
        >
          {title}
        </div>
      </div>
    </div>
  );
};
