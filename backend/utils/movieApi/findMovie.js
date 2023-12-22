/**
 * @프로젝트개요
 * - 프로젝트 팀명: OTTeam
 * - 프로젝트 제목: 영화 정보 제공 사이트
 * - 작성자: 이영재
 * - 최초작성일: 2023/10/15
 * - 종수정일: 2023/10/16
 * - 경로: backend/utils/movieApi/findMovie.js
 * @description [자체 mariadb DB에 저장된 영화 정보를 조회하는 함수]
 * @returns {Promise<object>} [영화 정보 객체를 반환하는 Promise 객체]
 * @param {string} title [영화 제목]
 */

const dbs = require("../dbs.js");

async function isFindMovie(title) {
  return new Promise(async (resolve, reject) => {
    try {
      const selectMovieListQuery = `SELECT * FROM movieList WHERE title LIKE ?`;
      const selectMovieListParams = [`%${title.split("").join("%")}%`];
      dbs.select(selectMovieListQuery, selectMovieListParams).then((result) => resolve(result.length > 0));
    } catch (error) {
      reject(error);
    }
  });
}
function isOneDayDifference(dateString) {
  const receivedDate = new Date(dateString);
  const currentDate = new Date();
  const diff = Math.abs(currentDate - receivedDate);
  const diffInDays = diff / (1000 * 60 * 60 * 24);
  return diffInDays < 1;
}

const insertMovieCache = async (movieNm) => {
  const insertMovieCacheQuery = `INSERT INTO movieCache (findMovieNm, findMovieDate) VALUES (?, now())`;
  const insertMovieCacheParams = [movieNm];
  dbs.insert(insertMovieCacheQuery, insertMovieCacheParams).then((result) => {
    if (result.affectedRows == 0) console.log("fail insert movieCache");
    else console.log("success insert movieCache");
    return false;
  });
};

async function findMovieCache(movieNm) {
  return new Promise(async (resolve, reject) => {
    try {
      const selectMovieCacheQuery = `SELECT * FROM movieCache WHERE findMovieNm = ?`;
      const selectMovieCacheParams = [movieNm];
      dbs.select(selectMovieCacheQuery, selectMovieCacheParams).then((result) => {
        if (result.length == 0) {
          return resolve(insertMovieCache(movieNm));
        } else {
          let isOneDay = isOneDayDifference(result[0].findMovieDate);
          if (isOneDay) {
            return resolve(true);
          } else {
            const deleteMovieCacheQuery = `DELETE FROM movieCache WHERE findID = ?`;
            const deleteMovieCacheParams = [result[0].findID];
            dbs.remove(deleteMovieCacheQuery, deleteMovieCacheParams).then((result) => {
              if (result.affectedRows == 0) console.log("fail delete movieCache");
              else console.log("success delete movieCache");
              return resolve(insertMovieCache(movieNm));
            });
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function findMovieList(title) {
  return new Promise(async (resolve, reject) => {
    try {
      const selectMovieListQuery = `SELECT ml.*, mi.posterUrl, round((SELECT AVG(rating) FROM MovieReview WHERE DOCID = ml.DOCID),2) AS average_rating FROM movieList ml JOIN movieInfo mi ON ml.DOCID = mi.DOCID WHERE ml.title LIKE ?;`;
      const selectMovieListParams = [`%${title.split("").join("%")}%`];
      console.log(selectMovieListQuery, selectMovieListParams);
      dbs.select(selectMovieListQuery, selectMovieListParams).then((result) => resolve(result));
    } catch (error) {
      reject(error);
    }
  });
}

async function findMovieInfo(DOCID) {
  return new Promise(async (resolve, reject) => {
    try {
      const selectMovieQuery = `SELECT ml.*, mi.*, ROUND((SELECT AVG(rating) FROM MovieReview WHERE DOCID = ml.DOCID), 2) AS average_rating FROM movieList ml JOIN movieInfo mi ON ml.DOCID = mi.DOCID WHERE ml.DOCID = ?;`;
      const selectMovieParams = [DOCID];
      dbs.select(selectMovieQuery, selectMovieParams).then(async (result) => {
        result[0].title = result[0].title.replace(/!HS|!HE/g, "");
        const selectDirectorQuery = `
          SELECT di.*
          FROM directorList dl 
          JOIN directorInfo di ON dl.directorId=di.directorId
          WHERE DOCID = ?`;
        const selectDirectorParams = [DOCID];
        let dirList = [];
        let actList = [];
        let plotList = [];
        await dbs.select(selectDirectorQuery, selectDirectorParams).then(async (directorList) => {
          await directorList.forEach((element) => {
            dirList.push(element);
          });
        });
        const selectActorQuery = `
          SELECT ai.*
          FROM actorList al 
          JOIN actorInfo ai ON al.actorId=ai.actorId
          WHERE DOCID = ?`;
        const selectActorParams = [DOCID];
        await dbs.select(selectActorQuery, selectActorParams).then(async (actorList) => {
          await actorList.forEach((element) => {
            actList.push(element);
          });
        });
        const selectPlotQuery = `
          SELECT plotLang, plotText
          FROM plotInfo
          WHERE DOCID = ?`;
        const selectPlotParams = [DOCID];
        await dbs.select(selectPlotQuery, selectPlotParams).then(async (plot) => {
          await plot.forEach(async (element) => {
            await plotList.push(element);
          });
        });

        resolve({ ...result[0], directors: dirList, actors: actList, plots: plotList });
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { isFindMovie, findMovieList, findMovieInfo, findMovieCache };
