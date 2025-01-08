'use client'

import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material"; // Using Material UI

export default function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/compare-llms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch LLM response");
      }

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error: unknown) {
        if (error instanceof Error) {
            setResponse("Error: " + error.message);
        } else {
            setResponse("Unknown error occurred");
        }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        backgroundColor: "#f4f7fa",
        borderRadius: 2,
        boxShadow: 3,
        width: "100%",
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Compare LLM Responses
      </Typography>

      <TextField
        label="Enter Your Prompt"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        sx={{
          marginBottom: 3,
          borderRadius: 1,
          padding: 1,
        }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          padding: "10px 20px",
          fontWeight: "bold",
          borderRadius: 1,
          "&:hover": {
            backgroundColor: "#3f51b5",
          },
        }}
      >
        Submit
      </Button>

      {response && (
        <Box
          sx={{
            marginTop: 3,
            width: "100%",
            backgroundColor: "#e3f2fd",
            borderRadius: 1,
            padding: 2,
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            boxShadow: 2,
            maxHeight: 300,
            overflowY: "auto"
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Response:
          </Typography>
          <Typography variant="body2">{response}</Typography>
        </Box>
      )}
    </Box>
  );
}