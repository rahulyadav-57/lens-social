import { Spin } from "antd";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import UserService from "../../../services/UserService";

const PopularUser: FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const users = await UserService.getPopularUsers();
      console.log(users.data.data.recommendedProfiles);
      setUsers(users.data.data.recommendedProfiles);
    })();
  }, []);

  return (
    <div>
      <h1 className="font-bold leading-tight text-4xl mt-4 mb-10">
        Popular users
      </h1>
      {users.length === 0 && <Spin size="large" />}
      <div className="grid grid-cols-4 gap-4">
        {users.map((item: any) => (
          <Link href={`/profile/${item.id}`} key={item.id}>
            <a
              key={item.id}
              className="relative max-w-md mx-auto md:max-w-2xl mt-1 min-w-0 break-words bg-white w-full mb-2 shadow-lg rounded-xl mt-0"
            >
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full flex justify-center">
                    <div className="relative w-[150px] h-[150px]">
                      <img
                        src={
                          item.picture?.original?.url ||
                          "https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"
                        }
                        className="shadow bg-white p-2 rounded-full object-cover align-middle border-none absolute w-[150px]  h-[150px]"
                      />
                    </div>
                  </div>
                  <div className="w-full text-center mt-5">
                    <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                      <div className="p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                          {item.stats.totalPosts}
                        </span>
                        <span className="text-sm text-slate-400">Posts</span>
                      </div>
                      <div className="p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                          {item.stats.totalFollowers}
                        </span>
                        <span className="text-sm text-slate-400">
                          Followers
                        </span>
                      </div>
                      <div className="p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                          {item.stats.totalFollowing}
                        </span>
                        <span className="text-sm text-slate-400">
                          Following
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-2 mb-5">
                  <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                    @{item.handle}
                  </h3>
                  {/* <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                  @{item.handle}
                </div> */}
                </div>
                {/* <div className="mt-6 py-6 border-t border-slate-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4">
                    <p className="font-light leading-relaxed text-slate-600 mb-4">
                      {item.bio}
                    </p>
                    <a
                      href="javascript:;"
                      className="font-normal text-slate-700 hover:text-slate-400"
                    >
                      Follow Account
                    </a>
                  </div>
                </div>
              </div> */}
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularUser;
