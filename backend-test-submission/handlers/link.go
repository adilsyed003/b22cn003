package handlers

import (
	"math/rand"
	"net/http"
	"time"

	"affordmed.com/adilsyed003/b22cn003/backend-test-submission/database"
	"affordmed.com/adilsyed003/b22cn003/backend-test-submission/models"
	"github.com/gin-gonic/gin"
)

func generateShortCode(n int) string {
	letters := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

	code := make([]rune, n)
	for i := range code {
		code[i] = letters[rand.Intn(len(letters))]
	}
	return string(code)
}

func CreateShortLink(c *gin.Context) {

		var req struct {
			URL     string `json:"url"`
			Minutes int64  `json:"minutes"`
		}
		if err := c.BindJSON(&req); err != nil || req.URL == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
			return
		}

		shortCode := generateShortCode(6)

		
		link := models.Link{
			ShortCode: shortCode,
			Original: req.URL,
			Expiry: time.Now().Add(time.Duration(req.Minutes) * time.Minute),
			Usage: 0,
		}
		if err := database.DB.Create(&link).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not create short link"})
		return
	}

		c.JSON(http.StatusOK, gin.H{
			"shortUrl": "http://localhost:5173/" + shortCode,
		})
	}
func RedirectShortLink(c *gin.Context) {
		code := c.Param("code")

		
		var link models.Link
	if err := database.DB.Where("short_code = ?", code).First(&link).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "link not found"})
		return
	}
		
	if time.Now().After(link.Expiry) {
		c.JSON(http.StatusGone, gin.H{"error": "link expired"})
		return
	}
		
		link.Usage++
		database.DB.Save(&link)
		c.JSON(http.StatusOK, link.Original)
	}

func UserStats(c *gin.Context){
		var links []models.Link
		database.DB.Find(&links)	
		total := len(links)
		var linkList []gin.H
	active := 0
	expired := 0
	now := time.Now()
	for _, l := range links {
		status := "active"
		if now.After(l.Expiry) {
			expired++
			status = "expired"
		} else {
			active++
		}
		linkList = append(linkList, gin.H{
            "shortCode": l.ShortCode,
            "original": l.Original,
            "expiry": l.Expiry,
            "usage": l.Usage,
            "status": status,
        })
	}
		
		c.JSON(http.StatusOK, gin.H{
			"total":     total,
			"active":    active,
			"expired":   expired,
			"links":     linkList,
		})
}

