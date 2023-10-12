-- Create the 'songs' table

DROP TABLE songs_to_users CASCADE;
DROP TABLE songs CASCADE;
DROP TABLE users CASCADE;
DROP TABLE playlists CASCADE;
DROP TABLE songs_to_playlists CASCADE;
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
  FOREIGN KEY (song_id) REFERENCES songs (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);


-- Create the 'playlists' table
CREATE TABLE playlists (
  id varchar PRIMARY KEY,
  user_id integer,
  name varchar,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Create the 'songs_to_playlists' table
CREATE TABLE songs_to_playlists (
  song_id varchar PRIMARY KEY,
  playlist_id varchar ,
  FOREIGN KEY (song_id) REFERENCES songs (id),
  FOREIGN KEY (playlist_id) REFERENCES playlists (id)
);

ALTER TABLE songs_to_users
ADD CONSTRAINT unique_song_user_combination UNIQUE (song_id, user_id);

ALTER TABLE songs_to_playlists
ADD CONSTRAINT unique_song_playlist_combination UNIQUE (song_id, playlist_id);