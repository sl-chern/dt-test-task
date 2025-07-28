"use client";

import { useCallback } from "react";
import { FetchInputType, FetchInitType } from "./types/fetch-params";

function useFetch() {
  return useCallback(async (input: FetchInputType, init?: FetchInitType) => {
    let headers: HeadersInit = {};

    if (!(init?.body instanceof FormData)) {
      headers = {
        ...headers,
        "Content-Type": "application/json",
      };
    }

    return fetch(input, {
      ...init,
      headers: {
        ...headers,
        ...init?.headers,
      },
    });
  }, []);
}

export default useFetch;
