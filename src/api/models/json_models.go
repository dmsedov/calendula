package models

import "github.com/dgrijalva/jwt-go"

type ErrorResult struct {
	Status string
	ErrMsg string
}

type JWTData struct {
	jwt.StandardClaims
	User     User     `json:"user"`
	Calendar Calendar `json:"calendar"`
}

type Config struct {
	Address   string `json:"address"`
	DebugMode bool   `json:"debug_mode"`
	DB        string `json:"db"`
	SecretKey string `json:"secret_key"`
}
