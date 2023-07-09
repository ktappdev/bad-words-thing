import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  return (
    <div className="grid grid-cols-1 justify-start items-center w-full overflow-clip">
      <div className="text-2xl text-center mb-4 w-full">Dashboard</div>
      Admin page / add new items to list
    </div>
  );
};

export default page;
