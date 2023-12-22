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
const dbs = require("../../utils/dbs.js");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
  let { userID, userPasswd } = req.body;

  const selectUserInfoQuery = `SELECT userCd, userMail, userPW, userName FROM userInfo WHERE userMail = ?`;
  const selectUserInfoParams = [userID];
  dbs.select(selectUserInfoQuery, selectUserInfoParams).then(async (result) => {
    if (result.length === 0) return res.json({ loggedIn: false, message: "User Not Found" });
    const { userCd, userMail, userPW, userName } = result[0];
    console.log(`${req.sessionID} : ${userID}} - 로그인 시도`);

    const match = await bcrypt.compare(userPasswd, userPW);
    if (!match) {
      return res.json({ loggedIn: false, message: "Invalid credentials" });
    }

    req.session.userCd = userCd;
    req.session.userMail = userMail;
    req.session.userName = userName;
    console.log(`${req.sessionID} : ${userID} - 로그인 성공\n${req.sessionID} : ${JSON.stringify(req.session)}`);
    return res.json({ loggedIn: true, userMail: userMail, userName: userName });
  });
});
module.exports = router;
