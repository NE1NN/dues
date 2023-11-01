import { AssContainerProps } from "../../../types/types";
import DueList from "./DueList";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function UpcomingAssessments({
  assessments,
}: AssContainerProps) {
  return (
    <div className="overflow-y-auto">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="font-bold text-black mt-4 text-2xl">
            Upcoming Deadlines
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {assessments.length > 0 ? (
              assessments.map((assessment, idx) => (
                <DueList
                  key={`${assessment.id}${idx}`}
                  assessment={assessment}
                ></DueList>
              ))
            ) : (
              <p>No upcoming deadlines.</p>
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
