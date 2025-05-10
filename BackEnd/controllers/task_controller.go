package controllers

import (
	"net/http"
	"task-manager/config"
	"task-manager/models"

	"github.com/gin-gonic/gin"
)

func GetTasks(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	var tasks []models.Task
	config.DB.Where("user_id = ?", userID).Find(&tasks)
	c.JSON(http.StatusOK, tasks)
}

func CreateTask(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	var task models.Task

	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	task.UserID = userID
	if err := config.DB.Create(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create task"})
		return
	}

	c.JSON(http.StatusOK, task)
}

func UpdateTask(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	id := c.Param("id")

	var existingTask models.Task
	if err := config.DB.Where("id = ? AND user_id = ?", id, userID).First(&existingTask).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	var updatedData struct {
		Title       string `json:"title"`
		Description string `json:"description"`
		Status      string `json:"status"`
		DueDate     string `json:"dueDate"`
	}

	if err := c.ShouldBindJSON(&updatedData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	existingTask.Title = updatedData.Title
	existingTask.Description = updatedData.Description
	existingTask.Status = updatedData.Status
	existingTask.DueDate = updatedData.DueDate

	if err := config.DB.Save(&existingTask).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update task"})
		return
	}

	c.JSON(http.StatusOK, existingTask)
}

func DeleteTask(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	id := c.Param("id")

	var task models.Task
	if err := config.DB.Where("id = ? AND user_id = ?", id, userID).First(&task).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	if err := config.DB.Delete(&task).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to delete task"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task deleted"})
}
