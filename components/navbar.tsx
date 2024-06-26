import { UserButton } from "@clerk/nextjs";
import React from "react";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { redirect } from "next/navigation";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={store} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4 ">
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
