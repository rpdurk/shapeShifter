-- CREATE SEQUENCE flyway_test.s_author_id START WITH 1;
 

CREATE TABLE game (
  game_token varchar(255),
  current_player_token varchar (255),
  serialized_game_state varchar(255),
  game_mode ENUM ('shapes', 'textures') NOT NULL,
  score INT NOT NULL,
  PRIMARY KEY (ID)
);

