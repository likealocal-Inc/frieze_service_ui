import Layout from "@/components/layouts/LayoutWithLogo";
import styles from "./index.module.css";
import Image from "next/image";
export default function UserInformationPage() {
  return (
    <>
      <Layout menuTitle=''>
        <div className={styles.top}>
          <div className='mt-[65px]'>
            <div className='flex flex-col items-center'>
              <div className={styles.title1}>I.M X MHQ</div>
              <div className={styles.title2}>For Frieze Members</div>
            </div>
            <div className='mt-[24px]'>
              <div className={styles.inputLabel}>
                Please enter your ID Or real name on your passport
              </div>
              <div className='mt-[5px]'>
                <input
                  type='text'
                  id='first_name'
                  className={styles.input}
                  placeholder='Required'
                  required
                />
              </div>
              <div className='pt-[16px]'></div>
              <div className={styles.inputLabel}>Please Enter your Email</div>
              <div className='mt-[5px]'>
                <input
                  type='email'
                  id='email'
                  className={styles.input}
                  placeholder='john.doe@company.com'
                  required
                />
              </div>
            </div>
            <div className='pt-[40px]'></div>
            <div className=''>
              <div className={styles.agreeTop}>
                <div className={styles.checkIcon}>
                  <Image
                    src='/icon/check.svg'
                    className={styles.checkIcon}
                    alt=''
                    width={14}
                    height={14}
                  />
                </div>
                <div className={styles.agreeAll}>
                  Agree to all the terms and conditions
                </div>
              </div>
              <div className=''>
                <div className='flex justify-between'>
                  <Image
                    src='/icon/check.svg'
                    className={styles.checkIcon}
                    alt=''
                    width={14}
                    height={14}
                  />
                  <div className={styles.agreeTermsAndCondition}>
                    Terms and conditions
                  </div>
                  <Image
                    src='/icon/icon-next.svg'
                    className={styles.iconNext}
                    alt=''
                    width={14}
                    height={14}
                  />
                </div>
                <div className='flex justify-between'>
                  <Image
                    src='/icon/check.svg'
                    className={styles.checkIcon}
                    alt=''
                    width={14}
                    height={14}
                  />
                  <div className={styles.agreeTermsAndCondition}>
                    Privacy Policy
                  </div>
                  <Image
                    src='/icon/icon-next.svg'
                    className={styles.iconNext}
                    alt=''
                    width={14}
                    height={14}
                  />
                </div>
                <div className='flex justify-between'>
                  <Image
                    src='/icon/check.svg'
                    className={styles.checkIcon}
                    alt=''
                    width={14}
                    height={14}
                  />
                  <div className={styles.agreeTermsAndCondition}>
                    Location Service Terms and Conditions
                  </div>
                  <Image
                    src='/icon/icon-next.svg'
                    className={styles.iconNext}
                    alt=''
                    width={14}
                    height={14}
                  />
                </div>
              </div>
            </div>
            {/* <div className=''>
              <div className={styles.btnConfirm}>
                <div className={styles.txtConfirm}>Confirm</div>
              </div>
            </div> */}
          </div>
        </div>
      </Layout>
    </>
  );
}
