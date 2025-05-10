package main

import (
	"task-manager/config"
	"task-manager/models"
	"task-manager/routes"
)

func main() {
	config.InitDB()
	config.DB.AutoMigrate(&models.User{}, &models.Task{})

	r := routes.SetupRoutes()
	r.Run(":" + config.GetEnv("PORT", "8080"))
}
