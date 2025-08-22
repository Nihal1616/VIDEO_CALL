import React from "react";
import { Button, IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

function ShareMeetingButton({ meetingCode }) {
  const handleShare = () => {
    if (!meetingCode) {
      alert("Meeting code not available");
      return;
    }

    const shareText = `Join my video meeting using this code: ${meetingCode}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Join my Video Call",
          text: shareText
        })
        .then(() => console.log("Meeting code shared successfully"))
        .catch((err) => console.error("Error sharing:", err));
    } else {
      // Fallback for browsers without Web Share API
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
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
