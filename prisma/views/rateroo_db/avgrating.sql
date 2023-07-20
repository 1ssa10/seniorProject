SELECT
  `rateroo_db`.`rating`.`filmId` AS `filmId`,
  avg(`rateroo_db`.`rating`.`nb_stars`) AS `average`
FROM
  `rateroo_db`.`rating`
GROUP BY
  `rateroo_db`.`rating`.`filmId`