import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const OutletContext = ({ titlePage, calendar, links, children }) => {
  const { setTitlePage, setCalendar, setLinks } = useOutletContext();

  useEffect(() => {
    setTitlePage(titlePage);
    setCalendar(calendar);
    setLinks(links);
  }, [children]);
  
  return children;
}

export default OutletContext;