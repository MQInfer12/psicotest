import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const OutletContext = ({ titlePage, calendar, children }) => {
  const { setTitlePage, setCalendar } = useOutletContext();

  useEffect(() => {
    setTitlePage(titlePage);
    setCalendar(calendar);
  }, [children]);
  
  return children;
}

export default OutletContext;