package models

import "time"

type Link struct {
	ID        uint      `gorm:"primaryKey"`
	Original  string    `gorm:"not null"`
	ShortCode string    `gorm:"uniqueIndex;not null"`
	Expiry    time.Time
	Usage     int
}