/**
 * @프로젝트개요
 * - 프로젝트 팀명: OTTeam
 * - 프로젝트 제목: 영화 정보 제공 사이트
 * - 작성자: 이영재
 * - 최초작성일: 2023/10/01
 * - 종수정일: 2023/11/06
 * - 경로: backend/routes/signup.js
 * @description [사용자 가입을 위한 라우터]
 * @returns {Promise<object>} [영화 정보 객체를 반환하는 Promise 객체]
 * @param {string} title [영화 제목]
 */

const express = require("express");
const router = express.Router();
const dbs = require("../../utils/dbs.js");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
  let { userMail, userPwd, userName } = req.body;

  const selectUserCheckQuery = `SELECT userMail FROM userInfo WHERE userMail = ?`;
  const selectUserCheckParams = [userMail];
  dbs.select(selectUserCheckQuery, selectUserCheckParams).then(async (result) => {
    if (result.length > 0) return res.json({ success: false, message: "Mail that exists" });

    const salt = await bcrypt.genSalt(10); // 기본이 10번이고 숫자가 올라갈수록 연산 시간과 보안이 높아진다.
    const insertUserInfoQuery = `INSERT INTO userInfo (userMail, userPW, userName) VALUES (?, ?, ?)`;
    const insertUserInfoParams = [userMail, await bcrypt.hash(userPwd, salt), userName];

    dbs.insert(insertUserInfoQuery, insertUserInfoParams).then((result) => {
      if (result.length > 0) return res.json({ success: true, message: "User Created" });
    });
  });
});
module.exports = router;
