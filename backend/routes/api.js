/**
 * @프로젝트개요
 * - 프로젝트 팀명: OTTeam
 * - 프로젝트 제목: 영화 정보 제공 사이트
 * - 작성자: 이영재
 * - 최초작성일: 2023/11/06
 * - 종수정일: 2023/11/06
 * - 경로: backend/routes/api.js
 * @description api 라우터
 * @returns {Promise<object>} [영화 정보 객체를 반환하는 Promise 객체]
 * @param {string} title [영화 제목]
 */

const express = require("express");
const router = express.Router();
const detailRouter = require("./api/detail");
const movieRouter = require("./api/movie");
const loginRouter = require("./api/login");
const signupRouter = require("./api/signup");
const commentRouter = require("./api/comment");
const authRouter = require("./api/auth");
const logout = require("./api/logout");

/* GET home page. */
router.get("/", function (req, res, next) {});

router.use("/detail", detailRouter);
router.use("/movie", movieRouter);
router.use("/login", loginRouter);
router.use("/signup", signupRouter);
router.use("/comment", commentRouter);
router.use("/auth", authRouter);
router.use("/logout", logout);

module.exports = router;
