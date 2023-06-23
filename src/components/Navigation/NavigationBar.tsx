import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

type StepType = "SELECT ARTISTS" | "REFINE PLAYLIST" | "GENERATE";
export const steps: StepType[] = [
  "SELECT ARTISTS",
  "REFINE PLAYLIST",
  "GENERATE",
];

interface NavigationBarProps {
  activeStep: number;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ activeStep }) => {
  return (
    <Stepper alternativeLabel activeStep={activeStep}>
      {steps.map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
