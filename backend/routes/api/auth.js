/**
 * @프로젝트개요
 * - 프로젝트 팀명: OTTeam
 * - 프로젝트 제목: 영화 정보 제공 사이트
 * - 작성자: 이영재
 * - 최초작성일: 2023/10/01
 * - 종수정일: 2023/11/06
 * - 경로: backend/routes/login.js
 * @description [사용자 로그인을 위한 라우터]
 * @returns {Promise<object>} [영화 정보 객체를 반환하는 Promise 객체]
 * @param {string} title [영화 제목]
 */

const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  console.log(req.sessionID);
  if (req.session.userMail) {
    return res.send({ loggedIn: true, userMail: req.session.userMail });
  } else {
    return res.send({ loggedIn: false });
  }
});

module.exports = router;
