export interface AgreeComponentProp {
  id: string;
  title: string;
  contents: string;
}
export const AgreeComponent = ({ id, title, contents }: AgreeComponentProp) => {
  return (
    <div className='w-[350px]'>
      <div className='flex flex-row justify-start'>
        <div className=''>
          <input
            id='disabled-checkbox'
            type='checkbox'
            value=''
            className='bg-[#ffffff] rounded border-solid border-gray-3 border w-5 h-5'
          />
        </div>
        <div className={`ml-[8px]`} />

        <div
          id={id}
          data-accordion='collapse'
          data-active-classes='bg-white'
          data-inactive-classes='bg-white'
        >
          <div id={`${id}_head`}>
            <div className='flex flex-row justify-between w-[310px]'>
              <div className='flex'>
                <div
                  data-accordion-target='#accordion-flush-body-1'
                  aria-expanded='true'
                  aria-controls={`${id}_body`}
                >
                  <div
                    className='text-[#262628] text-right relative flex items-center justify-end bg-white'
                    style={{
                      font: "500 14px/22px 'Pretendard', sans-serif",
                    }}
                  >
                    title
                  </div>
                </div>
              </div>
              <div className='flex'>
                <svg
                  data-accordion-icon
                  className='w-6 h-6 shrink-0'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div
            id={`${id}_body`}
            className='hidden'
            aria-labelledby={`${id}_head`}
          >
            <div className='py-5 border-b border-gray-200'>{contents}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
