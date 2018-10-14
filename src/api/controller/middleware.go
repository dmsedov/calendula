package controller

import (
	"calendula/src/api/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/kataras/iris"
	"strings"
)

func (ctrl ApiController) AuthMiddleware(ctx iris.Context) {
	jwtString := getJwtString(ctx)

	jwtData := new(models.JWTData)
	token, _ := jwt.ParseWithClaims(jwtString, jwtData, func(token *jwt.Token) (interface{}, error) {
		return []byte(ctrl.config.SecretKey), nil
	})

	if token.Valid {
		ctx.Next()
	}

	if !token.Valid {
		createError(ctx, iris.StatusUnauthorized, "Unauthorized")
	}
}

func getJwtString(ctx iris.Context) string {
	headerValue := string(ctx.GetHeader(models.AuthHeader))

	if !strings.HasPrefix(headerValue, models.Bearer) {
		return ""
	}

	return strings.TrimPrefix(headerValue, models.Bearer)
}
