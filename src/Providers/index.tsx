"use client";

import store from "@/redux/store";
import type { ProvidersProps } from "@/types";
import { Provider } from "react-redux";

const Providers = ({ children }: ProvidersProps) => {
  return <Provider store={store}> {children} </Provider>;
};

export default Providers;
