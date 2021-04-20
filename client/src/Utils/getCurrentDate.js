import { format } from "date-fns";
const currentDate = format(new Date(Date.now()), "iii MMM do, yyyy");
export default currentDate;
