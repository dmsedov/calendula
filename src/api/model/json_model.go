package model

type LoginData struct {
	Id     string `json:"id"`
	Name   string `json:"name"`
	ImgURL string `json:"imgUrl"`
	Email  string `json:"email"`
}

type ErrorResult struct {
	Status string
	ErrMsg string
}
