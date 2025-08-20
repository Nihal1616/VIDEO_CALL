import React from "react";
import { Button, IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

function ShareMeetingButton({ meetingCode }) {
  const handleShare = () => {
    if (!meetingCode) {
      alert("Meeting code not available");
      return;
    }

    const shareData = {
      title: "Join my Video Call",
      text: `Join my video meeting using this code: ${meetingCode}`,
      url: window.location.origin + "/" + meetingCode,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Meeting shared successfully"))
        .catch((err) => console.error("Error sharing:", err));
    } else {
      // Fallback for browsers without Web Share API
      const whatsappUrl = `https://wa.me/?text=Join my video meeting: ${shareData.url}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <Button variant="outlined" style={{ marginTop: "1rem" }}>
      <IconButton onClick={handleShare} color="primary">
        <ShareIcon />
      </IconButton>
    </Button>
  );
}

export default ShareMeetingButton;
