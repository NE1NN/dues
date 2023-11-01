import { AssContainerProps } from "../../../types/types";
import DueList from "./DueList";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CompletedAssessments({
  assessments,
}: AssContainerProps) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white' }}
        >
          <Typography className="font-bold text-black mt-4 text-2xl">
            Completed
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
              <Typography>No assessment completed.</Typography>
            )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
