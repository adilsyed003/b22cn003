package main

import (
	"log"

	"affordmed.com/adilsyed003/b22cn003/backend-test-submission/database"
	"affordmed.com/adilsyed003/b22cn003/backend-test-submission/handlers"
	"affordmed.com/adilsyed003/b22cn003/backend-test-submission/models"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // frontend dev server
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	database.Init()
	if err := database.DB.AutoMigrate( &models.Link{}); err != nil {
		log.Fatal("migration failed:", err)
	}
	
	
	r.GET("/:code", handlers.RedirectShortLink)
	r.POST("/api/shorten", handlers.CreateShortLink)
	r.GET("/api/stats", handlers.UserStats)



	r.Run(":8080")
}