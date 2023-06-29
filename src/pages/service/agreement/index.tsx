import LayoutWithLogo from "@/components/layouts/LayoutWithLogo";
import { Accordion } from "flowbite";
import type {
  AccordionOptions,
  AccordionItem,
  AccordionInterface,
} from "flowbite";
import { useEffect, useState } from "react";

export interface AgreementData {
  passportName: string;
  email: string;
  agreement: [boolean, boolean, boolean, boolean];
}
export default function AgreementPage() {
  const [ok, setOk] = useState(false);
  const [agreementData, setAgreementData] = useState<AgreementData>({
    passportName: "",
    email: "",
    agreement: [false, false, false, false],
  });
  const [agreeComponent, setAgreeComponent] = useState([
    false,
    false,
    false,
    false,
  ]);
  useEffect(() => {
    const accordionItems: AccordionItem[] = [
      {
        id: "accordion-flush-heading-1",
        triggerEl: document.querySelector("#accordion-flush-heading-1")!,
        targetEl: document.querySelector("#accordion-flush-body-1")!,
        active: false,
      },
      {
        id: "accordion-flush-heading-2",
        triggerEl: document.querySelector("#accordion-flush-heading-2")!,
        targetEl: document.querySelector("#accordion-flush-body-2")!,
        active: false,
      },
      {
        id: "accordion-flush-heading-3",
        triggerEl: document.querySelector("#accordion-flush-heading-3")!,
        targetEl: document.querySelector("#accordion-flush-body-3")!,
        active: false,
      },
      {
        id: "accordion-flush-heading-4",
        triggerEl: document.querySelector("#accordion-flush-heading-4")!,
        targetEl: document.querySelector("#accordion-flush-body-4")!,
        active: false,
      },
    ];

    const options = {
      alwaysOpen: false,
      activeClasses: "text-gray-900",
      inactiveClasses: "text-gray-500",
      onOpen: (item: any) => {},

      onClose: (item: any) => {},
      onToggle: (item: any) => {
        console.log(item._items);
        item._items.map((d: any, k: any) => {
          setAgreeComponent([
            ...agreeComponent,
            (agreeComponent[k] = d.active),
          ]);
        });
      },
    };
    const accordion = new Accordion(accordionItems, options);
    // accordion.open("accordion-flush-heading-1");
    accordion.close("accordion-flush-heading-1");
    accordion.close("accordion-flush-heading-2");
    accordion.close("accordion-flush-heading-3");
    accordion.close("accordion-flush-heading-4");
    // accordion.toggle("accordion-flush-heading-1");

    // accordion.open("accordion-flush-heading-2");
    // accordion.close("accordion-flush-heading-2");
    // accordion.toggle("accordion-flush-heading-2");

    // accordion.open("accordion-flush-heading-3");
    // accordion.close("accordion-flush-heading-3");
    // accordion.toggle("accordion-flush-heading-3");

    // accordion.open("accordion-flush-heading-4");
    // accordion.close("accordion-flush-heading-4");
    // accordion.toggle("accordion-flush-heading-4");
  }, []);

  useEffect(() => {
    onConfirm();
  }, [agreementData]);

  const selectAllCheckboxes = (check: any) => {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (checkboxes === undefined) return;

    for (var i = 0; i < checkboxes.length; i++) {
      (checkboxes[i] as HTMLInputElement).checked = check.target.checked;
    }
    setAgreementData({
      ...agreementData,
      agreement: [
        check.target.checked,
        check.target.checked,
        check.target.checked,
        check.target.checked,
      ],
    });
    onConfirm();
  };

  const onConfirm = () => {
    if (
      agreementData.passportName === "" ||
      agreementData.email === "" ||
      agreementData.agreement.includes(false)
    ) {
      setOk(false);
    } else {
      setOk(true);
    }
  };
  return (
    <>
      <LayoutWithLogo menuTitle=''>
        <div className=''>
          {/* Body 1 */}
          <div className=''>
            <div
              className='text-[#000000] text-left relative'
              style={{ font: "600 13px 'Pretendard', sans-serif" }}
            >
              For Frieze Members
            </div>
            <div className={`mt-[32px]`} />
            <div
              className='text-[#000000] text-left relative'
              style={{ font: "700 24px 'Pretendard', sans-serif" }}
            >
              아이엠 택시 이용을 위해
              <br />
              본인 확인 및 약관 동의가 필요해요
            </div>
            <div className={`mt-[20px]`} />
            <div
              className='text-[#bbbbbb] text-left relative'
              style={{ font: "600 13px 'Pretendard', sans-serif" }}
            >
              최초 1회만 진행
            </div>
          </div>
          {/* 입력창 */}
          <div className=''>
            <div className={`mt-[40px]`} />
            <div
              className='text-[#c4c4c4] text-left relative flex items-center justify-start text-lg'
              style={{ font: "500 12px/17px 'Pretendard', sans-serif" }}
            >
              Please enter your ID Or real name on your passport
            </div>
            <div className={`mt-[5px]`} />
            <input
              className='w-[336px] placeholder-[#bbbbbb] pl-[12px] text-slate-800 text-[16px] bg-[#f5f6fa] rounded-[10px] relative border-0 h-[56px]'
              placeholder='Required'
              value={agreementData.passportName}
              onChange={(e) => {
                setAgreementData({
                  ...agreementData,
                  passportName: e.target.value,
                });
                onConfirm();
              }}
            />
            <div className={`mt-[16px]`} />
            <div
              className='text-[#c4c4c4] text-left relative flex items-center justify-start'
              style={{ font: "500 12px/17px 'Pretendard', sans-serif" }}
            >
              Please enter your Email
            </div>
            <div className={`mt-[5px]`} />
            <input
              className='placeholder-[#bbbbbb] pl-[12px] text-[16px] text-slate-800 bg-[#f5f6fa] rounded-[10px] w-[336px] relative border-0 h-[56px]'
              placeholder='Required'
              value={agreementData.email}
              onChange={(e) => {
                setAgreementData({
                  ...agreementData,
                  email: e.target.value,
                });
                onConfirm();
              }}
            />
          </div>
          <div className={`mt-[40px]`} />
          {/* 동의 */}
          <div className=''>
            {/* 전체동의 */}
            <div className='flex items-center'>
              <input
                id='cb_all'
                type='checkbox'
                value=''
                className='bg-[#ffffff] rounded border-solid border-gray-3 border w-5 h-5'
                onClick={(e) => selectAllCheckboxes(e)}
              />
              <div className={`ml-[8px]`} />
              <label
                htmlFor='cb_all'
                className='text-[#262628] text-right relative flex items-center justify-end'
                style={{ font: "500 14px/22px 'Pretendard', sans-serif" }}
              >
                Agree to all terms and conditions
              </label>
            </div>
            <div className={`mt-[16px]`} />
            <div
              className='border-solid border-[#E7E7E7] w-[350px] h-0 relative'
              style={{
                borderWidth: "1px 0 0 0",
                transformOrigin: "0 0",
                transform: "rotate(0deg) scale(1, 1)",
              }}
            />
            <div className={`mt-[16px]`} />
            {/* 첫번째 동의 */}
            <div className='w-[350px]'>
              <div className='flex flex-row justify-start'>
                <div className=''>
                  <input
                    id='cb_1'
                    type='checkbox'
                    value=''
                    className='bg-[#ffffff] rounded border-solid border-gray-3 border w-5 h-5'
                    onClick={(e) => {
                      const d = e.target as HTMLInputElement;
                      setAgreementData({
                        ...agreementData,
                        agreement: [
                          d.checked,
                          agreementData.agreement[1],
                          agreementData.agreement[2],
                          agreementData.agreement[3],
                        ],
                      });
                    }}
                  />
                </div>
                <div className={`ml-[8px]`} />
                <div
                  id='accordion-flush1'
                  data-accordion='collapse'
                  data-active-classes='bg-white'
                  data-inactive-classes='bg-white'
                >
                  <div id='accordion-flush-heading-1'>
                    <div className='flex flex-row justify-between w-[310px]'>
                      <div className='flex'>
                        <div
                          data-accordion-target='#accordion-flush-body-1'
                          aria-expanded='true'
                          aria-controls='accordion-flush-body-1'
                        >
                          <div
                            className='text-[#262628] text-right relative flex items-center justify-end bg-white'
                            style={{
                              font: "500 14px/22px 'Pretendard', sans-serif",
                            }}
                          >
                            [Required] Agree to Terms of Use
                          </div>
                        </div>
                      </div>
                      <div className='flex'>
                        <svg
                          data-accordion-icon
                          className={
                            agreeComponent[0]
                              ? `w-6 h-6 shrink-0 text-[#BBBBBB] rotate-180`
                              : `w-6 h-6 shrink-0 text-[#BBBBBB]`
                          }
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
                    id='accordion-flush-body-1'
                    className='hidden'
                    aria-labelledby='accordion-flush-heading-1'
                  >
                    <div className='py-5 border-b border-gray-200'>
                      약관내용
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`mt-[15px]`} />
            {/* 두번째 동의 */}
            <div className='w-[350px]'>
              <div className='flex flex-row justify-start'>
                <div className=''>
                  <input
                    id='cb_2'
                    type='checkbox'
                    value=''
                    className='bg-[#ffffff] rounded border-solid border-gray-3 border w-5 h-5'
                    onClick={(e) => {
                      const d = e.target as HTMLInputElement;
                      setAgreementData({
                        ...agreementData,
                        agreement: [
                          agreementData.agreement[0],
                          d.checked,
                          agreementData.agreement[2],
                          agreementData.agreement[3],
                        ],
                      });
                    }}
                  />
                </div>
                <div className={`ml-[8px]`} />
                <div
                  id='accordion-flush2'
                  data-accordion='collapse'
                  data-active-classes='bg-white'
                  data-inactive-classes='bg-white'
                >
                  <div id='accordion-flush-heading-2'>
                    <div className='flex flex-row justify-between w-[310px]'>
                      <div className='flex'>
                        <div
                          data-accordion-target='#accordion-flush-body-2'
                          aria-expanded='true'
                          aria-controls='accordion-flush-body-2'
                        >
                          <div
                            className='text-[#262628] text-right relative flex items-center justify-end bg-white'
                            style={{
                              font: "500 14px/22px 'Pretendard', sans-serif",
                            }}
                          >
                            [Required] Agree to Privacy Policy
                          </div>
                        </div>
                      </div>
                      <div className='flex'>
                        <svg
                          data-accordion-icon
                          className={
                            agreeComponent[1]
                              ? `w-6 h-6 shrink-0 text-[#BBBBBB] rotate-180`
                              : `w-6 h-6 shrink-0 text-[#BBBBBB]`
                          }
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
                    id='accordion-flush-body-2'
                    className='hidden'
                    aria-labelledby='accordion-flush-heading-2'
                  >
                    <div className='py-5 border-b border-gray-200'>
                      약관내용
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`mt-[15px]`} />
            {/* 세번째 동의 */}
            <div className='w-[350px]'>
              <div className='flex flex-row justify-start'>
                <div className=''>
                  <input
                    id='cb_3'
                    type='checkbox'
                    value=''
                    className='bg-[#ffffff] rounded border-solid border-gray-3 border w-5 h-5'
                    onClick={(e) => {
                      const d = e.target as HTMLInputElement;
                      setAgreementData({
                        ...agreementData,
                        agreement: [
                          agreementData.agreement[0],
                          agreementData.agreement[1],
                          d.checked,
                          agreementData.agreement[3],
                        ],
                      });
                    }}
                  />
                </div>
                <div className={`ml-[8px]`} />
                <div
                  id='accordion-flush3'
                  data-accordion='collapse'
                  data-active-classes='bg-white'
                  data-inactive-classes='bg-white'
                >
                  <div id='accordion-flush-heading-3'>
                    <div className='flex flex-row justify-between w-[310px]'>
                      <div className='flex'>
                        <div
                          data-accordion-target='#accordion-flush-body-3'
                          aria-expanded='true'
                          aria-controls='accordion-flush-body-3'
                        >
                          <div
                            className='text-[#262628] text-right relative flex items-center justify-end bg-white'
                            style={{
                              font: "500 14px/22px 'Pretendard', sans-serif",
                            }}
                          >
                            [Required] 쿠키 수집 동의
                          </div>
                        </div>
                      </div>
                      <div className='flex'>
                        <svg
                          data-accordion-icon
                          className={
                            agreeComponent[2]
                              ? `w-6 h-6 shrink-0 text-[#BBBBBB] rotate-180`
                              : `w-6 h-6 shrink-0 text-[#BBBBBB]`
                          }
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
                    id='accordion-flush-body-3'
                    className='hidden'
                    aria-labelledby='accordion-flush-heading-3'
                  >
                    <div className='py-5 border-b border-gray-200'>
                      약관내용
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`mt-[15px]`} />
            {/* 네번쩨 동의 */}
            <div className='w-[350px]'>
              <div className='flex flex-row justify-start'>
                <div className=''>
                  <input
                    id='cb_4'
                    type='checkbox'
                    value=''
                    className='bg-[#ffffff] rounded border-solid border-gray-3 border w-5 h-5'
                    onClick={(e) => {
                      const d = e.target as HTMLInputElement;
                      setAgreementData({
                        ...agreementData,
                        agreement: [
                          agreementData.agreement[0],
                          agreementData.agreement[1],
                          agreementData.agreement[2],
                          d.checked,
                        ],
                      });
                    }}
                  />
                </div>
                <div className={`ml-[8px]`} />
                <div
                  id='accordion-flush4'
                  data-accordion='collapse'
                  data-active-classes='bg-white'
                  data-inactive-classes='bg-white'
                >
                  <div id='accordion-flush-heading-4'>
                    <div className='flex flex-row justify-between w-[310px]'>
                      <div className='flex'>
                        <div
                          data-accordion-target='#accordion-flush-body-3'
                          aria-expanded='true'
                          aria-controls='accordion-flush-body-4'
                        >
                          <div
                            className='text-[#262628] text-right relative flex items-center justify-end bg-white'
                            style={{
                              font: "500 14px/22px 'Pretendard', sans-serif",
                            }}
                          >
                            [Required] 위치 기반 서비스 동의
                          </div>
                        </div>
                      </div>
                      <div className='flex'>
                        <svg
                          data-accordion-icon
                          className={
                            agreeComponent[3]
                              ? `w-6 h-6 shrink-0 text-[#BBBBBB] rotate-180`
                              : `w-6 h-6 shrink-0 text-[#BBBBBB]`
                          }
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
                    id='accordion-flush-body-4'
                    className='hidden'
                    aria-labelledby='accordion-flush-heading-4'
                  >
                    <div className='py-5 border-b border-gray-200'>
                      약관내용
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`mt-[40px]`} />
          {/* 확인버튼 */}
          <div className=''>
            <button
              type='button'
              className={
                ok
                  ? `w-[350px] h-[56px] border-0 text-white rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-[#0085fe]`
                  : `w-[350px] h-[56px] border-0 text-white bg-[#BBBBBB] focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`
              }
            >
              Confirm
            </button>
          </div>
        </div>
      </LayoutWithLogo>
    </>
  );
}
