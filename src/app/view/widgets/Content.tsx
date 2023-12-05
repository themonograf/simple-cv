import { FloatingButton } from "@smplcv/app/Misc";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { CVViewTypes, Loader, TemplateSpace, Upload } from "..";
import { useSearchParams } from "react-router-dom";

const Content = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<CVViewTypes | null>(null);
  const [load, setLoad] = useState<boolean>(true);

  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    pageStyle: "siz",
  });

  const getJSONFromUrl = useCallback(async (url: string) => {
    setLoad(true);
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        try {
          setData(res);
        } catch (error) {
          setData(null);
        }
      });
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, []);

  const readJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e?.target?.files) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        if (event.target?.result) {
          try {
            setData(JSON.parse(event.target.result as string));
          } catch (error) {
            setData(null);
          }
          setLoad(false);
        }
      };
    }
  };

  useEffect(() => {
    if (url) {
      getJSONFromUrl(url);
    } else if (!url && import.meta.env.TMNG_DEFAULT_CV_URL) {
      getJSONFromUrl(import.meta.env.TMNG_DEFAULT_CV_URL);
    }
  }, [url, getJSONFromUrl]);
  return (
    <>
      {load ? <Loader /> : null}
      {data ? (
        <div className="flex h-screen w-screen justify-center bg-[#F5F7FA] p-4">
          <div className="w-full max-w-[800px] overflow-auto rounded-xl bg-white shadow-lg">
            <div ref={ref} className="flex h-a4 w-a4">
              {data ? <TemplateSpace {...data} /> : null}
            </div>
          </div>
          <FloatingButton onClick={handlePrint} />
        </div>
      ) : null}
      {!data ? <Upload onChange={readJsonUpload} /> : null}
    </>
  );
};

export default Content;
