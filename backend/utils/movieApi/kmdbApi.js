/**
 * @프로젝트개요
 * - 프로젝트 팀명: OTTeam
 * - 프로젝트 제목: 영화 정보 제공 사이트
 * - 작성자: 이영재
 * - 최초작성일: 2023/10/15
 * - 종수정일: 2023/10/16
 * - 경로: backend/utils/movieApi/kmdbApi.js
 * @description [영화 정보를 KMDB API를 통해 조회하는 함수]
 * @returns {Promise<object>} [영화 정보 객체를 반환하는 Promise 객체]
 */
//http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&title=그대들은&ServiceKey=081A4PYL3FSJ543054V4
const axios = require("axios");
const API_KEY = "081A4PYL3FSJ543054V4";
const BASE_URL = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?";

exports.getMovieList = async (movieNm) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `${BASE_URL}collection=kmdb_new2&detail=Y&title=${movieNm}&ServiceKey=${API_KEY}`
      );
      console.log(response.data.Data[0]);
      if (response.data.Data[0].TotalCount === 0) resolve(false);
      resolve(
        response.data.Data[0].Result.map((element) => {
          let directors = element.directors.director.map(({ directorId, directorNm, directorEnNm }) => ({
            directorId,
            directorNm,
            directorEnNm,
          }));
          let actors = element.actors.actor.map(({ actorId, actorNm, actorEnNm }) => ({
            actorId,
            actorNm,
            actorEnNm,
          }));
          let plots = element.plots.plot.map(({ plotLang, plotText }) => ({
            plotLang,
            plotText,
          }));

          return {
            DOCID: element.DOCID,
            title: element.title,
            titleEng: element.titleEng,
            titleOrg: element.titleOrg,
            prodYear: element.prodYear,
            nation: element.nation,
            runtime: element.runtime,
            rating: element.rating,
            genre: element.genre,
            directors,
            actors,
            plots,
            posterUrl: element.posters.split("|")[0],
          };
        })
      );
    } catch (error) {
      reject(error);
    }
  });
};
