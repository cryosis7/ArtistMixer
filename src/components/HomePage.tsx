import { Button } from "@mui/material";

interface HomePageProps {
  code: string;
}

export const HomePage: React.FC<HomePageProps> = ({ code }) => (
  <>
    <div>Generic Home Page.</div>
    <Button
      variant="outlined"
      onClick={() => console.log("code: ", localStorage.getItem("token"))}
    >
      Log Code
    </Button>
  </>
);
