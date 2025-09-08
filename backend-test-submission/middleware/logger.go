package middleware

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
)

var logServer = "http://20.244.56.144/evaluation-service/logs"

// replace this with your real token
var accessToken = os.Getenv("LOG_ACCESS_TOKEN")

type LogPayload struct {
	Stack   string `json:"stack"`
	Level   string `json:"level"`
	Package string `json:"package"`
	Message string `json:"message"`
}

func Log(stack, level, pkg, message string) {
	payload := LogPayload{
		Stack:   stack,
		Level:   level,
		Package: pkg,
		Message: message,
	}

	data, err := json.Marshal(payload)
	if err != nil {
		fmt.Println("Error marshalling log:", err)
		return
	}

	req, err := http.NewRequest("POST", logServer, bytes.NewBuffer(data))
	if err != nil {
		fmt.Println("Error creating log request:", err)
		return
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+accessToken)

	client := &http.Client{Timeout: 5 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending log:", err)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		fmt.Println("Log server responded with status:", resp.Status)
	}
}
