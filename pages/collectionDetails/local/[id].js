import { useRouter } from "next/router";
import React from "react";

export default function LocalCollectionDetails() {
    const router = useRouter();

    return <div>LocalCollection {router?.query?.id}</div>;
}
