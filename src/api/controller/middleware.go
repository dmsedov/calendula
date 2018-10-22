package controller

import (
	"calendula/src/api/models"
	"net/http"
	"strings"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func (ctrl ApiController) AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		jwtString := ctrl.GetJwtString(c)

		jwtData := new(models.JWTData)
		token, _ := jwt.ParseWithClaims(jwtString, jwtData, func(token *jwt.Token) (interface{}, error) {
			return []byte(ctrl.config.SecretKey), nil
		})

		if token.Valid {
			c.Next()
		}

		if !token.Valid {
			c.Abort()
			createError(c, http.StatusUnauthorized, "Unauthorized")
			return
		}
	}
}

func (ctrl ApiController) GetJwtString(c *gin.Context) string {
	headerValue := string(c.GetHeader(models.AuthHeader))

	if !strings.HasPrefix(headerValue, models.Bearer) {
		return ""
	}

	return strings.TrimPrefix(headerValue, models.Bearer)
}
