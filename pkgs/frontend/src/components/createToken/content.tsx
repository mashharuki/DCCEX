import { GlobalContext } from '@/context/GlobalProvider';
import { XummContext } from '@/context/XummProvider';
import { getAllFramework } from '@/utils/dbHelper';
import { useContext, useEffect, useState } from "react";
import { PageHeader } from "../common/pageHeader";
import Spinner from '../common/spinner';
import type { FrameworkInfo } from './createForm/createForm';
import { CreateForm } from './createForm/createForm';


/**
 * CreateTokenContent Component
 * @returns 
 */
export const CreateTokenContent = () => {
  const xumm = useContext(XummContext);
  const globalContext = useContext(GlobalContext);

  const [frameworks, setFrameworks] = useState<FrameworkInfo[]>();

  /**
   * 初期化メソッド
   */
  const init = async() => {
    const data = await getAllFramework();
    setFrameworks(data!);
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <div className=" h-full">
      <div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6  gap-6 flex flex-col w-full">
          {globalContext.loading ? (
            <Spinner/>
          ) : (
            <>
              {xumm.address == null ? (
                <h2 className='justify-center text-center'>Please Login!</h2>
              ) : (
                <>
                  {/* PageHeader */}
                  <PageHeader/>
                  <div className="h-full flex flex-col gap-2">
                    <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 text-center">
                      <>{ frameworks != undefined && <CreateForm frameworks={frameworks!} /> }</>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
