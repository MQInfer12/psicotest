import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom"

export const useVTNavigate = () => {
  const nav = useNavigate();

  const navigate = (to) => {
    if(document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          nav(to);
        })
      })
    } else {
      nav(to);
    }
  }

  return navigate;
}