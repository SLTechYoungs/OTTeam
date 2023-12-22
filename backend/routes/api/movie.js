/**
 * @프로젝트개요
 * - 프로젝트 팀명: OTTeam
 * - 프로젝트 제목: 영화 정보 제공 사이트
 * - 작성자: 이영재
 * - 최초작성일: 2023/10/01
 * - 종수정일: 2023/11/06
 * - 경로: backend/routes/movie.js
 * @description [영화 정보를 조회하는 라우터]
 * @returns {Promise<object>} [영화 정보 객체를 반환하는 Promise 객체]
 * @param {string} title [영화 제목]
 */

var express = require("express");
var router = express.Router();

const { isFindMovie, findMovieList, findMovieCache } = require("../../utils/movieApi/findMovie");
const { getMovieList } = require("../../utils/movieApi/kmdbApi");
const { insertMovie } = require("../../utils/movieApi/insertMovie");

router.post("/", async (req, res, next) => {
  //
  let { movieNm } = req.body;
  console.log(`Processing isfind movie: ${movieNm}`);
  let isMovieExist = await findMovieCache(movieNm);
  let isMovieExist2 = await isFindMovie(movieNm);

  if (!isMovieExist || !isMovieExist2) {
    // 없으면 api 요청
    console.log(`검색 캐시 없어서 api 재요청: ${movieNm}`);
    let movieList = await getMovieList(movieNm);
    if (!movieList) return res.json({ error: true, message: "Movie Not Found" });
    console.log(`api 요청 성공 및 저장완료: ${movieNm}`);
    await insertMovie(movieList);
  } else console.log(`검색 캐시 유효함: ${movieNm}`);

  console.log(`Processing find movie: ${movieNm}`);
  let movieList = await findMovieList(movieNm);
  console.log(`Success find movie: ${movieNm}`);
  await movieList.forEach((element, index) => {
    movieList[index].title = element.title.replace(/!HS|!HE/g, "");
  });
  console.log(movieList);
  return res.send(movieList);
});
module.exports = router;
