import { AgreeComponent } from "@/components/agreement/AgreementUI";
import InputComponent from "@/components/input/InputComponents";
import LayoutWithLogo from "@/components/layouts/LayoutWithLogo";
import InformationModal from "@/components/modal/InformationModal";
import { CODES } from "@/libs/codes";
import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";
import axios from "axios";

import { useEffect, useState } from "react";

export interface AgreementData {
  passportName: string;
  email: string;
  agreement: [boolean, boolean, boolean, boolean];
}
export default function AgreementPage() {
  const [orderAgreement, setOrderAgreement] = useState(0);
  const [showAgreement, setShowAgreement] = useState(false);

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

  const [errName, setErrName] = useState({ isError: false, errorMsg: "" });
  const [errEmail, setErrEmail] = useState({ isError: false, errorMsg: "" });

  useEffect(() => {
    // const accordionItems: AccordionItem[] = [
    //   {
    //     id: "accordion-flush-heading-1",
    //     triggerEl: document.querySelector("#accordion-flush-heading-1")!,
    //     targetEl: document.querySelector("#accordion-flush-body-1")!,
    //     active: false,
    //   },
    //   {
    //     id: "accordion-flush-heading-2",
    //     triggerEl: document.querySelector("#accordion-flush-heading-2")!,
    //     targetEl: document.querySelector("#accordion-flush-body-2")!,
    //     active: false,
    //   },
    //   {
    //     id: "accordion-flush-heading-3",
    //     triggerEl: document.querySelector("#accordion-flush-heading-3")!,
    //     targetEl: document.querySelector("#accordion-flush-body-3")!,
    //     active: false,
    //   },
    //   {
    //     id: "accordion-flush-heading-4",
    //     triggerEl: document.querySelector("#accordion-flush-heading-4")!,
    //     targetEl: document.querySelector("#accordion-flush-body-4")!,
    //     active: false,
    //   },
    // ];
    // const options = {
    //   alwaysOpen: false,
    //   activeClasses: "text-gray-900",
    //   inactiveClasses: "text-gray-500",
    //   onOpen: (item: any) => {},
    //   onClose: (item: any) => {},
    //   onToggle: (item: any) => {
    //     console.log(item._items);
    //     item._items.map((d: any, k: any) => {
    //       setAgreeComponent([
    //         ...agreeComponent,
    //         (agreeComponent[k] = d.active),
    //       ]);
    //     });
    //   },
    // };
    // const accordion = new Accordion(accordionItems, options);
    // accordion.open("accordion-flush-heading-1");
    // accordion.close("accordion-flush-heading-1");
    // accordion.close("accordion-flush-heading-2");
    // accordion.close("accordion-flush-heading-3");
    // accordion.close("accordion-flush-heading-4");
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

  const onSend = () => {
    let isGood = true;
    if (ElseUtils.isAllUpperCase(agreementData.passportName) === false) {
      setErrName({ isError: true, errorMsg: "Capital letters only" });
      isGood = false;
    } else {
      setErrName({ isError: false, errorMsg: "" });
    }

    const emailCheck = ElseUtils.isValidEmail(agreementData.email);
    if (emailCheck === false) {
      setErrEmail({ isError: true, errorMsg: "Insert email address" });
      isGood = false;
    } else {
      setErrEmail({ isError: false, errorMsg: "" });
    }

    if (isGood === false) return;

    localStorage.setItem("agreementData", JSON.stringify(agreementData));
    console.log(agreementData);

    axios
      .post("/api/user", {
        email: agreementData.email,
        name: agreementData.passportName,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        // 이미 존재하는 이메일 -> 인증 여부에 때라서 처리함
        if (err.response.data.info.code === CODES.ALREADY_EXIST_EMAIL.code) {
          axios.get(`/api/user?email=${err.response.data.data}`).then((d) => {
            const user = d.data.data;

            // 인증이 안된 상태면 인증페이지로 이동
            if (user.isAuth === false) {
              axios
                .post("/api/auth.email", {
                  elrigjd: SecurityUtils.encryptText(user.id),
                  qodkfj: SecurityUtils.encryptText(user.email),
                })
                .then((d) => {
                  location.href = "/service/emailAuth";
                });
            } else {
              localStorage.setItem(
                ElseUtils.localStorageUserIdKey,
                SecurityUtils.encryptText(user.id)
              );
              location.href = "/service/map";
            }
          });
        }
      });

    // location.href = "/service/map";
  };
  return (
    <>
      <LayoutWithLogo menuTitle=''>
        <div className=''>
          {/* Body 1 */}
          <div className=''>
            <div
              className='text-[#0085fe] text-left relative'
              style={{ font: "600 14px 'Pretendard', sans-serif" }}
            >
              For Frieze Members
            </div>
            <div className={`mt-[32px]`} />
            <div className='text-[#000000] text-left relative w-[344px] text-[24px] font-sans font-bold'>
              Verification and Agreement <br />
              to the terms and conditions need to use the service
            </div>
            <div className={`mt-[20px]`} />
            <div
              className='text-[#000000] text-left relative'
              style={{ font: "600 13px 'Pretendard', sans-serif" }}
            >
              This process is required only once.
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
            <InputComponent
              isError={errName.isError}
              errorMsg={errName.errorMsg}
              value={agreementData.passportName}
              required={true}
              placeholder='Capital letters only'
              onChange={(e: any) => {
                setAgreementData({
                  ...agreementData,
                  passportName: e.target.value,
                });
                onConfirm();
              }}
            />
            {/* <input
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
              required
            /> */}
            <div className={`mt-[16px]`} />
            <div
              className='text-[#c4c4c4] text-left relative flex items-center justify-start'
              style={{ font: "500 12px/17px 'Pretendard', sans-serif" }}
            >
              Please enter your Email
            </div>
            <div className={`mt-[5px]`} />
            <InputComponent
              isError={errEmail.isError}
              errorMsg={errEmail.errorMsg}
              value={agreementData.email}
              required={true}
              placeholder='Insert email address'
              onChange={(e: any) => {
                setAgreementData({
                  ...agreementData,
                  email: e.target.value,
                });
                onConfirm();
              }}
            />
            {/* <input
                required
                className='w-[336px] placeholder-[#bbbbbb] pl-[12px] text-slate-800 text-[16px] bg-[#f5f6fa] rounded-[10px] relative border-0 h-[56px]'
                placeholder='Required'
                value={agreementData.email}
                onChange={(e) => {
                  setAgreementData({
                    ...agreementData,
                    email: e.target.value,
                  });
                  onConfirm();
                }}
              /> */}
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
              <div
                className='ml-[4px] text-[#0085fe] text-left relative flex items-center justify-start'
                style={{ font: "500 14px/22px 'Pretendard', sans-serif" }}
              >
                Required
              </div>
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
            <AgreeComponent
              title='Agree to the privacy policy'
              onClick={(e: any) => {
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
              onShowAgreement={() => {
                setOrderAgreement(1);
                setShowAgreement(true);
              }}
            />
            {/* <div className='w-[350px]'>
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
              <div className='flex flex-row justify-start'>
                <input
                  id='default-checkbox'
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
                <div
                  className='ml-[8px] text-[#262628] text-right relative flex items-center justify-end'
                  style={{
                    font: "500 14px/22px 'Pretendard', sans-serif",
                    textDecoration: "underline",
                  }}
                >
                  Agree to the privacy policy
                </div>
              </div>
            </div> */}
            <div className={`mt-[15px]`} />
            {/* 두번째 동의 */}
            <AgreeComponent
              title='Agree to the privacy policy'
              onClick={(e: any) => {
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
              onShowAgreement={() => {
                setOrderAgreement(2);
                setShowAgreement(true);
              }}
            />

            <div className={`mt-[15px]`} />
            {/* 세번째 동의 */}
            <AgreeComponent
              title='I agree to the collection of cookies'
              onClick={(e: any) => {
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
              onShowAgreement={() => {
                setOrderAgreement(3);
                setShowAgreement(true);
              }}
            />
            <div className={`mt-[15px]`} />
            {/* 네번쩨 동의 */}
            <AgreeComponent
              title='I agree to the use of location-based services'
              onClick={(e: any) => {
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
              onShowAgreement={() => {
                setOrderAgreement(4);
                setShowAgreement(true);
              }}
            />
          </div>
          <div className={`mt-[40px]`} />
          {/* 확인버튼 */}
          <div className=''>
            {ok ? (
              <button
                type='submit'
                className={`w-[350px] h-[56px] border-0 text-white rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-[#0085fe]`}
                onClick={onSend}
              >
                Confirm
              </button>
            ) : (
              <button
                className={`w-[350px] h-[56px] border-0 text-white bg-[#BBBBBB] focus:ring-0  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`}
              >
                Confirm
              </button>
            )}
          </div>
        </div>

        {/* 약관읽기 */}
        <InformationModal show={showAgreement} setShow={setShowAgreement}>
          {orderAgreement === 1 ? (
            <div className='label'>
              <div className='element-CI-CS-wrapper'>
                <p className='element-CI-CS'>
                  <span className='text-wrapper'>
                    주의사항 및 안내사항
                    <br />
                  </span>
                  <span className='span'>
                    1. 수집항목
                    <br />
                    &nbsp;&nbsp;개인식별정보(CI), 이름, 휴대전화번호
                    <br />
                    2. 수집 및 이용목적
                    <br /> 서울 뷰티 트래블위크 프로그램 및 뷰티하우스 공간 예약
                    신청 접수, CS 및 분쟁 발생 시 해결을 위한 기록 보존
                    <br />
                    3. 보관기관
                    <br />① 개인정보 수집 및 이용 목적 달성 시 지체없이 파기
                    <br />② 단, 관련 법령에 의하여 일정 기간 보관이 필요한
                    경우에는 해당 기간 동안 보관함
                    <br />
                    4. 동의 거부권 등에 대한 고지
                    <br />
                    &nbsp;&nbsp; 정보주체는 개인정보의 수집 및 이용 동의를
                    거부할 권리가 있으나, 이 경우 서비스 이용이 제한될 수
                    있습니다.
                  </span>
                </p>
              </div>
            </div>
          ) : orderAgreement === 2 ? (
            <div className='label'>
              <div className='element-CI-CS-wrapper'>
                <p className='element-CI-CS'>
                  <span className='text-wrapper'>
                    주의사항 및 안내사항
                    <br />
                  </span>
                  <span className='span'>
                    1. 수집항목
                    <br />
                    &nbsp;&nbsp;개인식별정보(CI), 이름, 휴대전화번호
                    <br />
                    2. 수집 및 이용목적
                    <br /> 서울 뷰티 트래블위크 프로그램 및 뷰티하우스 공간 예약
                    신청 접수, CS 및 분쟁 발생 시 해결을 위한 기록 보존
                    <br />
                    3. 보관기관
                    <br />① 개인정보 수집 및 이용 목적 달성 시 지체없이 파기
                    <br />② 단, 관련 법령에 의하여 일정 기간 보관이 필요한
                    경우에는 해당 기간 동안 보관함
                    <br />
                    4. 동의 거부권 등에 대한 고지
                    <br />
                    &nbsp;&nbsp; 정보주체는 개인정보의 수집 및 이용 동의를
                    거부할 권리가 있으나, 이 경우 서비스 이용이 제한될 수
                    있습니다.
                  </span>
                </p>
              </div>
            </div>
          ) : orderAgreement === 3 ? (
            <div className='label'>
              <div className='element-CI-CS-wrapper'>
                <p className='element-CI-CS'>
                  <span className='text-wrapper'>
                    주의사항 및 안내사항
                    <br />
                  </span>
                  <span className='span'>
                    1. 수집항목
                    <br />
                    &nbsp;&nbsp;개인식별정보(CI), 이름, 휴대전화번호
                    <br />
                    2. 수집 및 이용목적
                    <br /> 서울 뷰티 트래블위크 프로그램 및 뷰티하우스 공간 예약
                    신청 접수, CS 및 분쟁 발생 시 해결을 위한 기록 보존
                    <br />
                    3. 보관기관
                    <br />① 개인정보 수집 및 이용 목적 달성 시 지체없이 파기
                    <br />② 단, 관련 법령에 의하여 일정 기간 보관이 필요한
                    경우에는 해당 기간 동안 보관함
                    <br />
                    4. 동의 거부권 등에 대한 고지
                    <br />
                    &nbsp;&nbsp; 정보주체는 개인정보의 수집 및 이용 동의를
                    거부할 권리가 있으나, 이 경우 서비스 이용이 제한될 수
                    있습니다.
                  </span>
                </p>
              </div>
            </div>
          ) : orderAgreement === 4 ? (
            <div className='label'>
              <div className='element-CI-CS-wrapper'>
                <p className='element-CI-CS'>
                  <span className='text-wrapper'>
                    주의사항 및 안내사항
                    <br />
                  </span>
                  <span className='span'>
                    1. 수집항목
                    <br />
                    &nbsp;&nbsp;개인식별정보(CI), 이름, 휴대전화번호
                    <br />
                    2. 수집 및 이용목적
                    <br /> 서울 뷰티 트래블위크 프로그램 및 뷰티하우스 공간 예약
                    신청 접수, CS 및 분쟁 발생 시 해결을 위한 기록 보존
                    <br />
                    3. 보관기관
                    <br />① 개인정보 수집 및 이용 목적 달성 시 지체없이 파기
                    <br />② 단, 관련 법령에 의하여 일정 기간 보관이 필요한
                    경우에는 해당 기간 동안 보관함
                    <br />
                    4. 동의 거부권 등에 대한 고지
                    <br />
                    &nbsp;&nbsp; 정보주체는 개인정보의 수집 및 이용 동의를
                    거부할 권리가 있으나, 이 경우 서비스 이용이 제한될 수
                    있습니다.
                  </span>
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
        </InformationModal>
      </LayoutWithLogo>
    </>
  );
}
