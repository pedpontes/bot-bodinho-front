import { CustomerModel } from "@/interfaces/customer";
import { useRouter } from "next/navigation";
import React from "react";

export type CustomerSessionContextType = {
  customer: CustomerModel;
};

export const CustomerSessionContext =
  React.createContext<CustomerSessionContextType | null>(null);

export default function CustomerSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [customer, setCustomer] = React.useState<CustomerModel | null>({
    email: "pontespeter@gmail.com",
    fullName: "Pedro Pontes",
    avatarUrl: null,
    username: "pedropontes",
  });

  window.cookieStore.get("@BODINHO:token");

  async function handleLoadCustomer() {
    try {
      const tokenCookie = await window.cookieStore.get("@BODINHO:token");
      const token = tokenCookie?.value;
    } catch (error) {}
  }

  if (!customer) {
    router.push("/login");
    return null;
  }

  return (
    <CustomerSessionContext.Provider value={{ customer }}>
      {children}
    </CustomerSessionContext.Provider>
  );
}
