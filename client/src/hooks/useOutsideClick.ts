import {useEffect, useRef, useState } from "react";

export const useOutsideClick = (initVisible: boolean) => {
  const [isShow, setIsShow] = useState(initVisible);
  const ref = useRef<HTMLUListElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if(ref.current && !ref.current.contains(event.target as Node)) {
      setIsShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true)
    return () => {
      document.removeEventListener('click', handleOutsideClick, true)
    }
  });

  return {ref, isShow, setIsShow}
}
