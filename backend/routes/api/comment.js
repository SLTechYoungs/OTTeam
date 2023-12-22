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
  const { DOCID } = req.body;
  const selectCommentQuery = `SELECT mr.*, ui.userName FROM MovieReview mr JOIN userInfo ui ON mr.userCd = ui.userCd WHERE DOCID = ?`;
  const selectCommentParams = [DOCID];

  dbs.select(selectCommentQuery, selectCommentParams).then(async (result) => {
    console.log(req.session.userCd);
    if (req.session.userCd)
      await result.forEach((element, index) => {
        result[index].reviewDate = result[index].reviewDate.toISOString().split("T")[0];
        result[index].isMine = element.userCd == req.session.userCd ? true : false;
      });
    return res.json({ success: true, message: "Comment Loaded", data: result.reverse() });
  });
});

router.post("/insert", async (req, res, next) => {
  let { DOCID, rating, text } = req.body;
  if (!req.session.userCd) return res.json({ success: false, message: "Not Logged In" });

  console.log(`${req.sessionID} : ${req.session.userCd} - 댓글 작성 시도`);
  const insertCommentQuery = `INSERT INTO MovieReview (DOCID, userCd, rating, reviewComment, reviewDate) VALUES (?, ?, ?, ?, now())`;
  const insertCommentParams = [DOCID, req.session.userCd, rating, text];

  dbs.insert(insertCommentQuery, insertCommentParams).then((result) => {
    if (result.length > 0) return res.json({ success: true, message: "Comment Created" });
    return res.json({ success: false, message: "Comment Not Created" });
  });
});

router.post("/delete", async (req, res, next) => {
  let { reviewID } = req.body;

  console.log(`${req.sessionID} : ${req.session.userCd} - 댓글 삭제 시도`);
  const deleteCommentQuery = `DELETE FROM MovieReview WHERE reviewID = ?`;
  const deleteCommentParams = [reviewID];

  dbs.remove(deleteCommentQuery, deleteCommentParams).then((result) => {
    if (result.length > 0) return res.json({ success: true, message: "Comment Deleted" });
    return res.json({ success: false, message: "Comment Not Deleted" });
  });
});
module.exports = router;
