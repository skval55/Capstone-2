import React from "react";

const UserInfo = () => {
  return (
    <div className="pt-32 ">
      <img
        className="m-auto rounded-full"
        src={localStorage.getItem("user_img")}
        alt="profile picture"
      />
      <h2 className="text-3xl text-black text-zinc-500 font-[500] sm:text-4xl capitalize">
        {localStorage.getItem("username")}
      </h2>
    </div>
  );
};

export default UserInfo;
