import { FloatingButton } from "@smplcv/app/Misc";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiMapPin, BiPhone } from "react-icons/bi";
import { BsBriefcase, BsInbox } from "react-icons/bs";
import { LuBookOpen, LuContact } from "react-icons/lu";
import { TbTools } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { CVViewTypes, Loader, Upload } from "@smplcv/app/view";
import { useSearchParams } from "react-router-dom";

const View = () => {
  const [data, setData] = useState<CVViewTypes | null>(null);
  const ref = useRef<HTMLDivElement>(null);
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

  if (load) {
    return <Loader />;
  }

  return data ? (
    <div className="flex h-screen w-screen justify-center bg-[#F5F7FA] p-4">
      <div className="w-full max-w-[800px] overflow-auto rounded-xl bg-white shadow-lg">
        <div ref={ref} className="flex h-a4 w-a4">
          <div className="h-full w-[250px] bg-[#243f4d] p-8 text-white">
            <div className="flex flex-col gap-8">
              {/* Photo */}
              <div className="flex justify-center">
                <div
                  className="h-44 w-44 rounded-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${data.photoUrl})` }}
                ></div>
              </div>

              {/* Kontak */}
              <div className="relative flex flex-col gap-4">
                <div className="-mr-8 flex items-center gap-2 border-b-2 border-white pb-1 font-black">
                  <LuContact />
                  <span className="text-lg">Kontak</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <BiPhone />
                    <span className="text-sm font-black">Phone</span>
                  </div>
                  <span className="text-sm">{data.mobilePhone || "-"}</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <BsInbox />
                    <span className="text-sm font-black">Email</span>
                  </div>
                  <span className="text-sm">{data.email || "-"}</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <BiMapPin />
                    <span className="text-sm font-black">Address</span>
                  </div>
                  <span className="text-sm">{data.streetAddress || "-"}</span>
                </div>
              </div>

              {/* Pendidikan */}
              {data.education?.length ? (
                <div className="relative flex flex-col gap-4">
                  <div className="-mr-8 flex items-center gap-2 border-b-2 border-white pb-1 font-black">
                    <LuBookOpen />
                    <span className="text-lg">Pendidikan</span>
                  </div>
                  {data.education.map((item) => (
                    <div key={item.id} className="flex flex-col">
                      <div className="text-xs font-light">
                        <span>{item.from}</span> -{" "}
                        <span>{item.isCurrent ? "Sekarang" : item.to}</span>
                      </div>
                      <span className="text-sm font-black">
                        {item.schoolName || "-"}
                      </span>
                      {item.faculty ? (
                        <span className="text-sm">{item.faculty}</span>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Skills */}
              {data.skills?.length ? (
                <div className="relative flex flex-col gap-4">
                  <div className="-mr-8 flex items-center gap-2 border-b-2 border-white pb-1 font-black">
                    <TbTools />
                    <span className="text-lg">Skil</span>
                  </div>

                  <div className="">
                    {data.skills.map((item) => (
                      <span
                        key={item}
                        className="mb-0.5 mr-1 inline-block rounded-3xl bg-gray-400 px-2 pb-1 pt-0.5 text-[10px] font-bold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Hobbies */}
              {data.hobbies?.length ? (
                <div className="relative flex flex-col gap-4">
                  <div className="-mr-8 flex items-center gap-2 border-b-2 border-white pb-1 font-black">
                    <TbTools />
                    <span className="text-lg">Hobi</span>
                  </div>

                  <div className="">
                    {data.hobbies.map((item) => (
                      <span
                        key={item}
                        className="mb-0.5 mr-1 inline-block rounded-3xl bg-gray-400 px-2 pb-1 pt-0.5 text-[10px] font-bold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="h-full w-[550px] bg-white p-8 text-black">
            <div className="flex flex-col gap-8">
              {/* Intro */}
              <div className="flex h-44 flex-col justify-center gap-2">
                <div className="flex flex-col">
                  <span className="text-3xl font-black">{data.fullName}</span>
                  <span className="text-lg">{data.currentPosition || "-"}</span>
                </div>
                <span className="text-sm font-light">
                  {data.introduction || "-"}
                </span>
              </div>

              {/* Experiences */}
              {data.workExperiences?.length ? (
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b-2 border-black pb-1 font-black">
                    <BsBriefcase />
                    <span className="text-lg">Pengalaman Kerja</span>
                  </div>
                  {data.workExperiences
                    .sort((a, b) => a.sequence - b.sequence)
                    .map((item, index) => (
                      <div
                        key={item.id}
                        className="relative flex flex-col gap-1 pl-5"
                      >
                        <div className="text-[10px] text-xs font-light">
                          <span>
                            {format(new Date(item.from), "dd MMM yyyy")}
                          </span>{" "}
                          -{" "}
                          {item.isCurrent || item.to ? (
                            <span>
                              {item.isCurrent
                                ? "Sekarang"
                                : format(
                                    new Date(item.to || ""),
                                    "dd MMM yyyy",
                                  )}
                            </span>
                          ) : null}
                        </div>
                        <span className="text-sm font-black">
                          {item.companyName || "-"}{" "}
                          {item.position ? `(${item.position})` : null}
                        </span>
                        <div className="text-xs">
                          {item.descriptionList &&
                          item.descriptionList.length <= 1 ? (
                            <span>
                              {item.descriptionList[0].description || "-"}
                            </span>
                          ) : (
                            <ul className="ml-4 flex list-disc flex-col gap-0.5">
                              {item.descriptionList.map((description) => (
                                <li key={description.id}>
                                  {description.description}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Bullet */}
                        <div className="absolute left-0 top-0.5 z-10 h-[13px] w-[13px] rounded-full border-2 border-gray-500" />
                        {/* Line */}
                        {index > 0 ? (
                          <div className="absolute -top-5 left-1.5 h-[23px] w-[1px] bg-gray-500" />
                        ) : null}
                        <div className="absolute bottom-0 left-1.5 top-3.5 w-[1px] bg-gray-500" />
                      </div>
                    ))}
                </div>
              ) : null}

              {/* Organisasi */}
              {data?.organizations?.length ? (
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b-2 border-black pb-1 font-black">
                    <HiOutlineUserGroup />
                    <span className="text-lg">Organisasi</span>
                  </div>
                  {data.organizations.map((item, index) => (
                    <div
                      key={item.id}
                      className="relative flex flex-col gap-1 pl-5"
                    >
                      <div className="text-[10px] text-xs font-light">
                        <span>{item.from}</span> -{" "}
                        {item.isCurrent || item.to ? (
                          <span>{item.isCurrent ? "Sekarang" : item.to}</span>
                        ) : null}
                      </div>
                      <span className="text-sm font-black">{item.name}</span>
                      <span className="mb-1 text-xs">{item.title}</span>
                      <div className="text-xs">
                        {item.descriptionList &&
                        item.descriptionList.length <= 1 ? (
                          <span>
                            {item.descriptionList[0].description || "-"}
                          </span>
                        ) : (
                          <ul className="ml-4 flex list-disc flex-col gap-0.5">
                            {item.descriptionList.map((description) => (
                              <li key={description.id}>
                                {description.description}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Bullet */}
                      <div className="absolute left-0 top-0.5 z-10 h-[13px] w-[13px] rounded-full border-2 border-gray-500" />
                      {/* Line */}
                      {index > 0 ? (
                        <div className="absolute -top-5 left-1.5 h-[23px] w-[1px] bg-gray-500" />
                      ) : null}
                      <div className="absolute bottom-0 left-1.5 top-3.5 w-[1px] bg-gray-500" />
                      {/* {index + 1 < data.workExperiences.length ? (
                      ) : null} */}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <FloatingButton onClick={handlePrint} />
    </div>
  ) : (
    <Upload onChange={readJsonUpload} />
  );
};

export default View;
