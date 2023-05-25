import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";

const UserCard = () => {
  const { data: sessionData } = useSession();
  const userMeta = api.meta.get.useQuery();
  return (
    <div className="max-w-xs">
      <div className=" rounded border">
        {sessionData?.user.image && (
          <div>
            <Image
              height={50}
              width={50}
              src={sessionData.user.image}
              alt="user image"
              className="rounded-full"
            />
            <p className="text-center text-2xl">{sessionData.user?.name}</p>
            <p className="text-center text-2xl">{userMeta.data?.bio}</p>
            <p className="text-center text-2xl">{userMeta.data?.pronoun}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
