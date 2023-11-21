-- Create the 'songs' table

-- CREATE DATABASE music_search_test;

-- DROP DATABASE music_search_test;
-- CREATE DATABASE music_search_test;
-- \connect music_search_test

-- -- connect to db

-- CREATE EXTENSION vector;

DROP TABLE IF EXISTS songs_to_users CASCADE;
DROP TABLE IF EXISTS songs CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS playlists CASCADE;
DROP TABLE IF EXISTS songs_to_playlists CASCADE;
-- DROP TABLE songs2;
-- DROP TABLE songs3;


CREATE TABLE songs (
  id varchar PRIMARY KEY,
  embedding vector(1536),
  title varchar,
  artist varchar,
  album varchar,
  img_url varchar,
  mp3_url varchar
);

-- Create the 'users' table
CREATE TABLE users (
  id serial PRIMARY KEY,
  username varchar,
  img_url varchar
);
-- Create the 'songs_to_users' table
CREATE TABLE songs_to_users (
  song_id varchar,
  user_id integer,
  FOREIGN KEY (song_id) REFERENCES songs (id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);


-- Create the 'playlists' table
CREATE TABLE playlists (
  id varchar PRIMARY KEY,
  user_id integer,
  name varchar,
  in_db boolean,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create the 'songs_to_playlists' table
CREATE TABLE songs_to_playlists (
  song_id varchar,
  playlist_id varchar ,
  FOREIGN KEY (song_id) REFERENCES songs (id) ON DELETE CASCADE,
  FOREIGN KEY (playlist_id) REFERENCES playlists (id) ON DELETE CASCADE
);

ALTER TABLE songs_to_users
ADD CONSTRAINT unique_song_user_combination UNIQUE (song_id, user_id);

ALTER TABLE songs_to_playlists
ADD CONSTRAINT unique_song_playlist_combination UNIQUE (song_id, playlist_id);