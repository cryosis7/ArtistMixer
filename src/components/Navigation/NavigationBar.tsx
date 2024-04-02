import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';

type StepType = 'SELECT ARTISTS' | 'REFINE PLAYLIST' | 'GENERATE';
export const steps: StepType[] = ['SELECT ARTISTS', 'REFINE PLAYLIST', 'GENERATE'];

interface NavigationBarProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ activeStep, setActiveStep }) => {
  return (
    <Stepper alternativeLabel activeStep={activeStep} nonLinear sx={{ p: 4 }}>
      {steps.map((step, index) => (
        <Step key={step}>
          <StepButton onClick={() => setActiveStep(index)}>{step}</StepButton>
        </Step>
      ))}
    </Stepper>
  );
};
