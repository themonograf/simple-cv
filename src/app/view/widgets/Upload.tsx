interface IUpload {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Upload = ({ onChange }: IUpload) => {
  return (
    <div className="fixed top-0 z-10 flex h-full w-full bg-black bg-opacity-60">
      <div className="extraOutline bg-whtie m-auto w-max rounded-lg bg-white p-4">
        <div className="file_upload relative w-[450px] rounded-lg border-4 border-dotted border-gray-300 p-5">
          <svg
            className="mx-auto mb-4 w-24 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="input_field mx-auto flex w-max flex-col text-center">
            <label>
              <input
                className="hidden w-36 cursor-pointer text-sm"
                type="file"
                multiple
                onChange={onChange}
              />
              <div className="text cursor-pointer rounded border border-gray-300 bg-indigo-600 p-1 px-3 font-semibold text-white hover:bg-indigo-500">
                Select
              </div>
            </label>

            <div className="title uppercase text-indigo-500">
              or drop files here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
