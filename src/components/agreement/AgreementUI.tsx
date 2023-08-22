import Link from "next/link";

export interface AgreeComponentProp {
  pdfLink: string;
  title: string;
  onClick: Function;
}
export const AgreeComponent = ({
  title,
  onClick,
  pdfLink,
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
        <Link href={pdfLink} target='_blank'>
          <div
            // href={pdfLink}
            // target='_blank'
            rel='noopener noreferrer'
            className='relative flex items-center justify-end text-right text-gray-6 ml-[5px] text-black no-underline'
            style={{
              font: "400 15px/22px 'Pretendard', sans-serif",
              textDecoration: "underline",
            }}
            // onClick={(e) => onShowAgreement()}
          >
            {title}
          </div>
        </Link>
      </div>
    </div>
  );
};
