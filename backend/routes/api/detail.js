/**
 * @프로젝트개요
 * - 프로젝트 팀명: OTTeam
 * - 프로젝트 제목: 영화 정보 제공 사이트
 * - 작성자: 이영재
 * - 최초작성일: 2023/11/06
 * - 종수정일: 2023/11/06
 * - 경로: backend/routes/api/movie.js
 * @description [영화 상세정보를 조회하는 라우터]
 * @returns {Promise<object>} [영화 정보 객체를 반환하는 Promise 객체]
 * @param {string} title [영화 제목]
 */

var express = require("express");
var router = express.Router();

const { findMovieInfo } = require("../../utils/movieApi/findMovie");

router.post("/", async (req, res, next) => {
  let { DOCID } = req.body;

  let movieList = await findMovieInfo(DOCID);
  return res.send(movieList);
});
module.exports = router;
