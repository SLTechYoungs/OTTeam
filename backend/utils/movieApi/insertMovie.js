/**
 * @프로젝트개요
 * - 프로젝트 팀명: OTTeam
 * - 프로젝트 제목: 영화 정보 제공 사이트
 * - 작성자: 이영재
 * - 최초작성일: 2023/10/15
 * - 종수정일: 2023/10/16
 * - 경로: backend/utils/movieApi/findMovie.js
 * @description [자체 mariadb DB에 영화를 저장하는 함수]
 * @returns {boolean} [영화 정보 객체를 반환하는 Promise 객체]
 * @param {Object} movieList [영화 제목]
 */
const dbs = require("../dbs.js");

async function insertMovie(movieList) {
  return new Promise(async (resolve, reject) => {
    try {
      const results = await Promise.all(
        movieList.map(async (movie) => {
          console.log(`Processing insert movie: ${movie.DOCID}_${movie.title}`);
          const {
            DOCID,
            title,
            titleEng,
            titleOrg,
            prodYear,
            nation,
            runtime,
            rating,
            genre,
            directors,
            actors,
            plots,
            posterUrl,
          } = movie;

          // movieInfo 테이블에 영화 정보를 저장합니다.
          await console.log(`Processing insert movieInfo: ${DOCID}_${title}`);
          const insertMovieInfoQuery = `INSERT INTO movieInfo (DOCID, prodYear, nation, runtime, rating, genre, posterUrl) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE prodYear = VALUES(prodYear), nation = VALUES(nation), runtime = VALUES(runtime), rating = VALUES(rating), genre = VALUES(genre), posterUrl = VALUES(posterUrl)`;
          const insertMovieInfoParams = [DOCID, prodYear || null, nation, runtime || null, rating, genre, posterUrl];
          const movieInfoResult = await dbs.insert(insertMovieInfoQuery, insertMovieInfoParams);

          if (movieInfoResult.affectedRows === 0) {
            // console.log(`fail insert movieInfo: ${DOCID}_${title}`);
            return { success: false };
          } else console.log(`Success insert movieInfo: ${DOCID}_${title}`);

          // movieList 테이블에 영화 정보를 저장합니다.
          // console.log(`Processing insert movieList: ${DOCID}_${title}`);
          const insertMovieListQuery = `INSERT INTO movieList (DOCID, title, titleEng, titleOrg) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), titleEng = VALUES(titleEng), titleOrg = VALUES(titleOrg) `;
          const insertMovieListParams = [DOCID, title, titleEng, titleOrg];
          const movieListResult = await dbs.insert(insertMovieListQuery, insertMovieListParams);

          if (movieListResult.affectedRows === 0) {
            // console.log(`fail insert movieList: ${DOCID}_${title}`);
            return { success: false };
          } else console.log(`Success insert movieList: ${DOCID}_${title}`);

          await Promise.all(
            plots.map(async (plot) => {
              // plotInfo 테이블에 영화 정보를 저장합니다.
              // console.log(`Processing insert plotInfo: ${DOCID}_${title}`);
              const insertPlotInfoQuery = `INSERT INTO plotInfo (plotLang, plotText, DOCID) VALUES (?, ?, ?)`;
              const insertPlotInfoParams = [plot.plotLang, plot.plotText, DOCID];
              const plotInfoResult = await dbs.insert(insertPlotInfoQuery, insertPlotInfoParams);

              if (plotInfoResult.affectedRows === 0) {
                console.log(`fail insert plotInfo: ${DOCID}_${title}`);
                return { success: false };
              }
            }),
            directors.map(async (director) => {
              // directorInfo 테이블에 감독 정보 존재 여부를 확인합니다.
              if (!director.directorId) return console.log(`null directorId: ${director.directorId}`);
              // console.log(`Processing isfind directorInfo: ${director.directorId}`);
              const isDirectorExistQuery = `SELECT * FROM directorInfo WHERE directorId = ?`;
              const isDirectorExistParams = [parseInt(director.directorId)];
              const isDirectorExistResult = await dbs.select(isDirectorExistQuery, isDirectorExistParams);
              // 감독 정보가 없다면 directorInfo 테이블에 감독 정보를 저장합니다.
              if (isDirectorExistResult.length === 0) {
                // console.log(`Processing insert directorInfo: ${director.directorId}`);
                const insertDirectorInfoQuery = `INSERT INTO directorInfo (directorId, directorNm, directorEnNm) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE directorNm = VALUES(directorNm), directorEnNm = VALUES(directorEnNm)`;
                const insertDirectorInfoParams = [director.directorId, director.directorNm, director.directorEnNm];
                const directorInfoResult = await dbs.insert(insertDirectorInfoQuery, insertDirectorInfoParams);

                if (directorInfoResult.affectedRows === 0) {
                  // console.log(`fail insert directorInfo: ${director.directorId}`);
                  return { success: false };
                } else console.log(`Success insert directorInfo: ${director.directorId}`);
              }
            }),
            actors.map(async (actor) => {
              // actorInfo 테이블에 배우 정보 존재 여부를 확인합니다.
              if (!actor.actorId) return console.log(`null directorId: ${actor.actorId}`);
              // console.log(`Processing isfind actorInfo: ${actor.actorId}`);
              const isActorExistQuery = `SELECT * FROM actorInfo WHERE actorId = ?`;
              const isActorExistParams = [parseInt(actor.actorId)];
              const isActorExistResult = await dbs.select(isActorExistQuery, isActorExistParams);
              // 배우 정보가 없다면 actorInfo 테이블에 배우 정보를 저장합니다.
              if (isActorExistResult.length === 0) {
                // console.log(`Processing insert actorInfo: ${actor.actorId}`);
                const insertActorInfoQuery = `INSERT INTO actorInfo (actorId, actorNm, actorEnNm) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE actorNm = VALUES(actorNm), actorEnNm = VALUES(actorEnNm)`;
                const insertActorInfoParams = [actor.actorId, actor.actorNm, actor.actorEnNm];
                const actorInfoResult = await dbs.insert(insertActorInfoQuery, insertActorInfoParams);

                if (actorInfoResult.affectedRows === 0) {
                  // console.log(`fail insert actorInfo: ${actor.actorId}`);
                  return { success: false };
                } else console.log(`Success insert actorInfo: ${actor.actorId}`);
              }
            })
          );

          await Promise.all(
            directors.map(async (director) => {
              // directorList 테이블에 감독 정보를 저장합니다.
              if (!director.directorId) return console.log(`null directorId: ${director.directorId}`);
              // console.log(`Processing insert directorList: ${director.directorId}`);
              const insertDirectorListQuery = `INSERT INTO directorList (DOCID, directorId) VALUES (?, ?)`;
              const insertDirectorListParams = [DOCID, director.directorId];
              const directorListResult = await dbs.insert(insertDirectorListQuery, insertDirectorListParams);
              if (directorListResult.affectedRows === 0) {
                console.log(`fail insert directorList: ${director.directorId}`);
                return { success: false };
              } else console.log(`Success insert directorList: ${director.directorId}`);
            }),
            actors.map(async (actor) => {
              // actorList 테이블에 배우 정보를 저장합니다.
              if (!actor.actorId) return console.log(`null directorId: ${actor.actorId}`);
              // console.log(`Processing insert actorList: ${actor.actorId}`);
              const insertActorListQuery = `INSERT INTO actorList (DOCID, actorId) VALUES (?, ?)`;
              const insertActorListParams = [DOCID, actor.actorId];
              const actorListResult = await dbs.insert(insertActorListQuery, insertActorListParams);
              if (actorListResult.affectedRows === 0) {
                console.log(`fail insert actorList: ${actor.actorId}`);
                return { success: false };
              } else console.log(`Success insert actorList: ${actor.actorId}`);
            })
          );
          console.log(`Success insert movie: ${DOCID}_${title}`);
          return { success: true };
        })
      );
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { insertMovie };
