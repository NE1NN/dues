// export default function DueAssessments({ assessments }: AssContainerProps) {
//   return (
//     <div>
//       <h1 className="font-bold text-black mt-4 text-2xl">Due assessments</h1>
//       {assessments.map((assessment, idx) => (
//         <DueList
//           key={`${assessment.id}${idx}`}
//           assessment={assessment}
//         ></DueList>
//       ))}
//     </div>
//   );
// }

import { AssContainerProps } from "../../../types/types";
import DueList from "./DueList";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DueAssessments({ assessments }: AssContainerProps) {
  return (
    <div className="overflow-y-auto">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="font-bold text-black mt-4 text-2xl">
            Due Assessments
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
            {assessments.length > 0 ? (
              assessments.map((assessment, idx) => (
                <DueList
                  key={`${assessment.id}${idx}`}
                  assessment={assessment}
                ></DueList>
              ))
            ) : (
              <Typography>No assessments due.</Typography>
            )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
