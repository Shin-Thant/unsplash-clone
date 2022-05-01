import React, { useEffect, useState } from "react";
import { useStorage } from "./useStorage";

export const useRecent = (name) => {
    const [recent, setRecent] = useState("");
    const [error, setError] = useState("");
    const [storage, setStorage] = useStorage(name || "recent", []);

    // useEffect(() => {
    //     console.log(storage);
    // }, [storage]);

    useEffect(() => {
        try {
            let tempo = [...storage];

            if (recent?.length) {
                if (!tempo?.includes(recent)) {
                    tempo?.unshift(recent);
                    if (tempo?.length > 5) tempo.pop();

                    setStorage([...tempo]);
                } else {
                    let tempo2 = tempo?.filter((t) => t !== recent);
                    tempo2.unshift(recent);

                    setStorage(tempo2);
                }
            }
        } catch (err) {
            console.error(err);
            setError(err);
        }
    }, [recent]);

    return [recent, error, setRecent, storage];
};
