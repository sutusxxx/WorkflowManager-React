import { useState, useEffect } from "react";

export function useMinDelay(isLoading: boolean, delay = 200) {
    const [show, setShow] = useState(isLoading);

    useEffect(() => {
        if (isLoading) {
            setShow(true);
            return;
        }
        const timer = setTimeout(() => setShow(false), delay);
        return () => clearTimeout(timer);
    }, [isLoading, delay]);

    return show;
}