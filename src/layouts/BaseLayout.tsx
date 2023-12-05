import { ReactNode } from "react";

type BaseLayoutType = {
  children: ReactNode;
};

const BaseLayout = ({ children }: BaseLayoutType) => {
  return <div className="flex h-screen w-full flex-col p-5">{children}</div>;
};

export default BaseLayout;
