import { useEffect, useState } from "react";
import axios from "axios";

import { Accordion } from "flowbite";
import type {
  AccordionOptions,
  AccordionItem,
  AccordionInterface,
} from "flowbite";

import { AgreeComponent } from "@/components/agreement/AgreementUI";
import InputComponent from "@/components/input/InputComponents";
import LayoutWithLogo from "@/components/layouts/LayoutWithLogo";
import InformationModal from "@/components/modal/InformationModal";
import { CODES } from "@/libs/codes";
import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";
import InternationalNumber from "@/components/InternationalNumber";
import NotOpen from "../notopen";
import { useRouter } from "next/router";

export interface AgreementData {
  passportName: string;
  email: string;
  phone: string;
  phoneInternational: string;
  agreement: [boolean, boolean, boolean, boolean];
}

export default function AgreementPage() {
  const [orderAgreement, setOrderAgreement] = useState(0);
  const [showAgreement, setShowAgreement] = useState(false);

  const [ok, setOk] = useState(false);
  const [agreementData, setAgreementData] = useState<AgreementData>({
    passportName: "",
    email: "",
    phoneInternational: "",
    phone: "",
    agreement: [false, false, false, false],
  });

  const [errName, setErrName] = useState({ isError: false, errorMsg: "" });
  const [errEmail, setErrEmail] = useState({ isError: false, errorMsg: "" });
  const [errPhone, setErrPhone] = useState({ isError: false, errorMsg: "" });

  const [isGongji, setIsGongji] = useState(true);
  const [accordion, setAccordion] = useState<AccordionInterface>();

  const [title, setTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.isReady === false) return;
    const domain = window.location.hostname;
    if (domain.includes("frieze")) {
      setTitle("For Frieze Members");
    } else if (domain.includes("kiaf")) {
      setTitle("For Kiaf Members");
    } else if (domain.includes("taxi")) {
      setTitle("");
    }
  }, [router]);

  useEffect(() => {
    const accordionItems: AccordionItem[] = [
      {
        id: "accordion-collapse-heading-1",
        triggerEl: document.querySelector("#accordion-collapse-heading-1")!,
        targetEl: document.querySelector("#accordion-collapse-body-1")!,
        active: false,
      },
    ];

    const options: AccordionOptions = {
      alwaysOpen: false,
      activeClasses: "text-[#262628] text-[24px]",
      inactiveClasses: "text-[#262628] text-[24px]",
      onOpen: (item) => {},
      onClose: (item) => {},
      onToggle: (item) => {},
    };

    const _accordion: AccordionInterface = new Accordion(
      accordionItems,
      options
    );
    setAccordion(_accordion);
    _accordion!.close("accordion-collapse-heading-1");
  }, []);

  useEffect(() => {
    onConfirm(false);
  }, [agreementData]);

  /**
   * 전체 체크박스 비활성화
   * @returns
   */
  const upSelectAll = () => {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (checkboxes === undefined) return;

    for (var i = 0; i < checkboxes.length; i++) {
      (checkboxes[i] as HTMLInputElement).checked = false;
    }
    setAgreementData({
      ...agreementData,
      agreement: [false, false, false, false],
    });

    if (accordion === undefined) return;
    // accordion!.toggle("accordion-example-heading-1");
  };

  /**
   * 전체선택
   * @param check
   * @returns
   */
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
    onConfirm(true);
  };

  const onConfirm = (isCheckBox: boolean) => {
    var checkboxes = document.getElementById("cb_all");
    if (
      agreementData.passportName === "" ||
      agreementData.email === "" ||
      agreementData.phone === "" ||
      agreementData.agreement.includes(false)
    ) {
      if (agreementData.agreement.includes(false)) {
        if (accordion !== undefined && isCheckBox === true) {
          accordion.open("accordion-collapse-heading-1");
        }
        (checkboxes as HTMLInputElement).checked = false;
      } else {
        if (accordion !== undefined && isCheckBox === true) {
          accordion.close("accordion-collapse-heading-1");
        }
        (checkboxes as HTMLInputElement).checked = true;
      }

      setOk(false);
    } else {
      (checkboxes as HTMLInputElement).checked = true;
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

    // const phoneCheck = ElseUtils.isValidEmail(agreementData.phone);
    // if (phoneCheck === false) {
    //   setErrPhone({ isError: true, errorMsg: "Insert phone number" });
    //   isGood = false;
    // } else {
    //   setErrPhone({ isError: false, errorMsg: "" });
    // }

    if (isGood === false) return;

    ElseUtils.setLocalStoragWithEncoding(
      "agreement",
      JSON.stringify(agreementData)
    );

    // return;
    // 사용자 등록
    axios
      .post("/api/user", {
        email: agreementData.email,
        name: agreementData.passportName,
        phone: `${agreementData.phoneInternational} ${agreementData.phone}`,
      })
      .then((res) => {
        // 체크 비활성화
        upSelectAll();
        location.href = "/service/emailAuth";
        return;
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
                  return;
                });
            } else {
              ElseUtils.setLocalStoragWithEncoding(
                ElseUtils.localStorageUserIdKey,
                user.id
              );
              location.href = "/service/map";
              return;
            }
          });
        } else if (err.response.data.info.code === CODES.NO_AUTH.code) {
          const data = SecurityUtils.encryptText(err.response.data.data);
          axios.post(`/api/auth.email/send?jsdkfjekm=${data}`).then((d) => {
            upSelectAll();
            location.href = "/service/emailAuth";
            return;
          });
        }
      });
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
              {title}
            </div>
            <div className={`mt-[32px]`} />
            <div className='text-[#000000] text-left relative text-[24px] font-sans font-bold'>
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
          <div className={`mt-[56px]`} />
          {/* 입력창 */}
          <div className=''>
            <div
              className='text-[#c4c4c4] text-left text-lg'
              style={{ font: "500 12px/17px 'Pretendard', sans-serif" }}
            >
              Enter your real name on your passport
            </div>
            <div className={`mt-[5px]`} />
            <div className='pr-[20px]'>
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
                  onConfirm(false);
                }}
              />
              <div className={`mt-[16px]`} />
              <div
                className='text-[#c4c4c4] text-left relative flex items-center justify-start'
                style={{ font: "500 12px/17px 'Pretendard', sans-serif" }}
              >
                Enter your Email
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
                  onConfirm(false);
                }}
              />
              <div className={`mt-[16px]`} />
              <div
                className='text-[#c4c4c4] text-left relative flex items-center justify-start'
                style={{ font: "500 12px/17px 'Pretendard', sans-serif" }}
              >
                Enter your Phone
              </div>
              <div className={`mt-[5px]`} />
              <div className='flex w-full justify-stretch'>
                <InternationalNumber
                  onChange={(e: any) => {
                    setAgreementData({
                      ...agreementData,
                      phoneInternational: e.target.value,
                    });
                  }}
                />
                <div className='ml-[10px]'></div>
                <InputComponent
                  isError={errPhone.isError}
                  errorMsg={errPhone.errorMsg}
                  value={agreementData.phone}
                  required={true}
                  placeholder='Insert phone address'
                  onChange={(e: any) => {
                    setAgreementData({
                      ...agreementData,
                      phone: e.target.value,
                    });
                    onConfirm(false);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={`mt-[56px]`} />

          {/* 동의 */}
          <div className='rounded-sm ring-1 ring-gray-200 p-[16px]'>
            {/* 전체동의 */}
            <div id='accordion-collapse' data-accordion='collapse'>
              <div>
                <div className='flex items-center justify-between w-full font-medium text-left bg-white'>
                  <div className='flex items-center justify-around'>
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
                      className='text-[#262628] flex justify-start items-start'
                      style={{
                        font: "500 16px/22px 'Pretendard', sans-serif",
                      }}
                    >
                      Agree to all terms and conditions
                    </label>
                  </div>
                  <div
                    id='accordion-collapse-heading-1'
                    className='pr-[5px] bg-white'
                    data-accordion-target='#accordion-collapse-body-1'
                    aria-expanded='true'
                    aria-controls='accordion-collapse-body-1'
                  >
                    <svg
                      data-accordion-icon
                      className='w-4 h-4 rotate-180 shrink-0'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 10 6'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 5 5 1 1 5'
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                id='accordion-collapse-body-1'
                className='hidden'
                aria-labelledby='accordion-collapse-heading-1'
              >
                <div className='border border-b-0 border-gray-200'>
                  <div className={`mt-[16px]`} />
                  <div
                    className='border-solid border-[#E7E7E7]'
                    style={{
                      borderWidth: "1px 0 0 0",
                      transformOrigin: "0 0",
                      transform: "rotate(0deg) scale(1, 1)",
                    }}
                  />
                  <div className={`mt-[16px]`} />
                  {/* 첫번째 동의 */}
                  <AgreeComponent
                    title='Agree to the Terms of Use'
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
                    pdfLink='/download/service.pdf'
                  />
                  <div className={`mt-[15px]`} />
                  {/* 두번째 동의 */}
                  <AgreeComponent
                    title='Agree to the Privacy Policy'
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
                    pdfLink='/download/private.pdf'
                  />
                  <div className={`mt-[15px]`} />
                  {/* 세번째 동의 */}
                  <AgreeComponent
                    title='Agree to the Collection of Cookies'
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
                    pdfLink='/download/cookie2.pdf'
                  />
                  <div className={`mt-[15px]`} />
                  {/* 네번쩨 동의 */}
                  <AgreeComponent
                    title='Agree to the use of Location-based services'
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
                    pdfLink='/download/location2.pdf'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`mt-[20px]`} />
          <div
            className='text-[#4c4c4c] text-left relative w-[350px]'
            style={{ font: "400 11px/140% 'Pretendard', sans-serif" }}
          >
            You have the right to refuse consent for the collection/use of
            personal information and the provision of personal information to
            third parties. However, please note that refusing consent may result
            in limitations on vehicle usage.
          </div>
          <div className={`mt-[22px]`} />
          {/* 확인버튼 */}
          <div className=''>
            {ok ? (
              <button
                type='submit'
                className={`w-full h-[56px] border-0 text-white rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-[#0085fe]`}
                onClick={onSend}
              >
                Verify to use the taxi service
              </button>
            ) : (
              <button
                className={`w-full h-[56px] border-0 text-white bg-[#BBBBBB] focus:ring-0  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`}
              >
                Verify to use the taxi service
              </button>
            )}
          </div>
        </div>

        {/*  */}
        {/* {isGongji === false ? (
          ""
        ) : (
          <div className='fixed inset-0 flex items-center justify-center bg-slate-600 Z-50 bg-opacity-30'>
            <div className='flex items-center justify-center bg-white w-[328px] h-[272px]  rounded-[10px]'>
              <div className='flex flex-col items-center w-full h-full'>
                <div className='mt-[24px]' />
                <div className='mt-[16px]' />
                <div className='text-[24px] font-sans font-bold'>
                  I&apos;m sorry
                </div>
                <div className='mt-[24px]' />
                <div className='font-sans text-[#bbbbbb] text-[17px] flex justify-center items-center text-center w-[240px]'>
                  The following service for frieze members will be launching on
                  August 30th, 2023.
                </div>
                <div className='mt-[24px]' />
                <button
                  className='h-[56px] w-[280px] border-0 rounded-lg bg-[#0085FE] text-white text-[14px]'
                  onClick={(e) => {
                    setIsGongji(false);
                  }}
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )} */}
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
      <NotOpen />
    </>
  );
}
