import React from "react";
import { Button, IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

function ShareMeetingButton({ meetingCode }) {
  const handleShare = () => {
    if (!meetingCode) {
      alert("Meeting URL not available");
      return;
    }

    const shareText = `Join my video meeting: ${meetingCode}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Join my Video Call",
          text: shareText,
          url: meetingCode
        })
        .then(() => console.log("Meeting URL shared successfully"))
        .catch((err) => console.error("Error sharing:", err));
    } else {
      // Fallback for browsers without Web Share API
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    // <Button variant="outlined" style={{ marginTop: "1rem" }}>
      <IconButton
        variant="outlined"
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          border: "1px solid black",
          width: 48,
          height: 48,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        onClick={handleShare}
        color="primary"
      >
        <ShareIcon style={{ fontSize: 28 }} />
      </IconButton>
    // </Button>
  );
}

export default ShareMeetingButton;
