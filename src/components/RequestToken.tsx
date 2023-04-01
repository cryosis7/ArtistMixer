import Button from "@mui/material/Button";
import { Dispatch, SetStateAction } from "react";

interface RequestTokenProps {
  code: string;
  setToken: Dispatch<SetStateAction<string>>;
}

/**
 * Asks the backend to get a token from spotify
 * @param {string} code The code from spotify
 * @param {Dispatch<SetStateAction<string>>} setToken The function to set the token
 * @returns {JSX.Element} The button to get the token
 */
export const RequestToken: React.FC<RequestTokenProps> = ({
  code,
  setToken,
}) => {
  if (!code) return <></>;

  return (
    <>
      <div>{code}</div>
      <Button
        variant="contained"
        onClick={() => {
          const url =
            "https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/authenticate";
          fetch(`${url}?code=${code}`)
            .then((res) => res.json())
            .then((data) => {
              setToken(data.token);
              console.log("Token set: ", data.token);
              localStorage.setItem("token", data.token);
            })
            .catch((err) => console.log(err));
        }}
      >
        Get Token
      </Button>
    </>
  );
};
