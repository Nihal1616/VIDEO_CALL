import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, Snackbar, Alert } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";

function generateRandomCode(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [createdMeetingCode, setCreatedMeetingCode] = useState("");

  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  // Create a new meeting with a random code
  let handleCreateMeeting = async () => {
    const newCode = generateRandomCode();
    await addToUserHistory(newCode);
    setCreatedMeetingCode(newCode);
    setMeetingCode(newCode); // Autofill the join input with the new code
    setOpenSnackbar(true);
    // Do not navigate immediately; prompt user to click Join
  };

  return (
    <>
      <div className="navBar">
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
        >
          <h2>Video Call</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => {
              navigate("/history");
            }}
          >
            <RestoreIcon />
          </IconButton>
          <p>History</p>

          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Providing Quality Video Call Just Like Quality Education</h2>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ marginBottom: "1rem", marginTop: "2rem" }}>
                <Button variant="contained" onClick={handleCreateMeeting}>
                  Create Meeting
                </Button>
              </div>

              <div>
                <Button onClick={handleJoinVideoCall} variant="contained">
                  Join
                </Button>
              </div>
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
              >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                  Successfully created the meeting. Now click on Join button to join meeting.
                </Alert>
              </Snackbar>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <img srcSet="/logo3.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
