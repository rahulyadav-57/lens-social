import { Spin } from "antd";
import { FC, useEffect, useState } from "react";
import UserService from "../../../services/UserService";

const UserProfile: FC = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await UserService.getProfile(slug);
        console.log(response.data.data);
        setUserDetails(response.data.data);
      } catch (error) {}
    })();
  }, [slug]);
  useEffect(() => {
    setSlug(location.pathname.split("/").slice(1)[1]);
  }, []);

  const userInfoLayout = () => (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-12 mx-12 w-2xl container px-2 mx-auto">
      <aside className="">
        <div className="bg-white shadow rounded-lg p-10">
          <div className="flex flex-col gap-1 text-center items-center">
            <img
              className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
              src={
                userDetails.profile.picture?.original?.url ||
                "https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"
              }
              alt=""
            />
            <p className="font-semibold">@{userDetails.profile.handle}</p>
          </div>
          <div className="flex justify-center items-center gap-2 my-3">
            <div className="font-semibold text-center mx-4">
              <p className="text-black">
                {userDetails.profile.stats.totalPosts}
              </p>
              <span className="text-gray-400">Posts</span>
            </div>
            <div className="font-semibold text-center mx-4">
              <p className="text-black">
                {userDetails.profile.stats.totalFollowers}
              </p>
              <span className="text-gray-400">Followers</span>
            </div>
            <div className="font-semibold text-center mx-4">
              <p className="text-black">
                {userDetails.profile.stats.totalFollowing}
              </p>
              <span className="text-gray-400">Folowing</span>
            </div>
          </div>
        </div>
        <div className="bg-white shadow mt-6  rounded-lg p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-4">
            Followers
          </h3>
          <ul className="flex items-center justify-center space-x-2">
            {/* Story #1 */}
            {userDetails.followers.items
              .slice(0, 4)
              .map((item: any, i: number) => {
                return (
                  <li className="flex flex-col items-center space-y-2" key={i}>
                    {/* Ring */}
                    <a className="block bg-white p-1 rounded-full" href="#">
                      <img
                        className="w-16 rounded-full"
                        src={`${
                          item.wallet?.defaultProfile?.picture?.original?.url ||
                          "https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"
                        }`}
                      />
                    </a>
                    {/* Username */}
                    <span className="text-xs text-gray-500">
                      {item.wallet.defaultProfile.handle}
                    </span>
                  </li>
                );
              })}

            {/* Story #1 */}
          </ul>
        </div>
      </aside>
      <article>
        {userDetails.publications.items.map((item: any, i: number) => (
          <div className="bg-white shadow rounded-lg" key={i}>
            <div className="border-b border-gray-100" />
            <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
              <img
                className="rounded w-full"
                // src={item?.metadata?.media}
              />
            </div>
            <div className="text-gray-600 font-semibold  mb-4 mx-3 px-2">
              {item?.metadata?.content}
            </div>
            <br />
            <div className="text-gray-500 text-sm mb-6 mx-3 px-2"></div>
          </div>
        ))}
      </article>
    </main>
  );

  return (
    <div>
      <div className="ap">
        {userDetails && userInfoLayout()}
        {!userDetails && (
          <div className="mt-10 d-flex">
            <Spin size="large" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
