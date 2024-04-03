import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

type StepType = 'SELECT ARTISTS' | 'GENERATE' | 'REFINE' | 'SAVE';
export const steps: StepType[] = ['SELECT ARTISTS', 'GENERATE', 'REFINE', 'SAVE'];

interface NavigationBarProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ activeStep, setActiveStep }) => {
  const goNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const goPreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
      <Button variant="outlined" disabled={activeStep === 0} onClick={goPreviousStep}>
        Previous
      </Button>
      <Stepper alternativeLabel activeStep={activeStep} nonLinear sx={{ width: 0.8 }}>
        {steps.map((step, index) => (
          <Step key={step}>
            <StepButton onClick={() => setActiveStep(index)}>{step}</StepButton>
          </Step>
        ))}
      </Stepper>
      <Button variant="outlined" disabled={activeStep === steps.length - 1} onClick={goNextStep}>
        Next
      </Button>
    </Box>
  );
};
